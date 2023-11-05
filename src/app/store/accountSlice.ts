import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { DataRegister, Login, Register, RegisterInput} from "../models/Account";
import { Result } from "../models/Interfaces/IResponse";
import { Role } from "../models/Role";


interface AccountState {
    account: DataRegister | null;
    roleData: Role[] | null;
    token: string | null;
    accountAll: any | null;
    //tokenExpirationDate: Date | null;
    accountLoaded:boolean;
}

const initialState: AccountState = {
    account: null,
    roleData: null,
    token: null,
    accountLoaded: false,
    accountAll:null
    //tokenExpirationDate: null,
};

export interface setUpAccount {
    account: DataRegister;
    token: string;
    //expirationDate?: Date;
};


export const loadAccountStorage = () =>
    JSON.parse(localStorage.getItem("account")!);

export const loginAccount = createAsyncThunk<any, Login>(
    'account/login',
    async (dataAccount, thunkAPI) => {
        try {
            let formData = new FormData();
            formData.append("Email", dataAccount.email);
            formData.append("Password", dataAccount.password);
            const result = await agent.Account.login(formData);
            const { data,token } = result
            if (data) {
                thunkAPI.dispatch(setTingAccount({ account: data, token: token } as setUpAccount));
                localStorage.setItem('account', JSON.stringify(result.data))
            }
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const updateAccountAsync = createAsyncThunk<DataRegister,any>("account/updateAccountAsync",
    async (data, thunkAPI) => {
      const account = loadAccountStorage();
     
           try {
       const result = await agent.Account.updateAccount(data,account.id);
       return result;
    } catch (error: any) {
       return thunkAPI.rejectWithValue({ error: error.data });
     }
    }
);

export const fetchRolesAsync = createAsyncThunk<any>(
  'account/fetchRoles',
  async (id, thunkAPI) => {
    
      try {
          const {result}  : Result = await agent.Role.getbyrole(id);
          
          
          thunkAPI.dispatch(setRoleData(result));
      } catch (error: any) {
          return thunkAPI.rejectWithValue({ error: error.data })
      }
  }
);

export const fetchAccountAll = createAsyncThunk(
  "account/fetchAccountAll",
  async (_, thunkAPI) => {
    
    try {
      const data = await agent.Account.getAccount();
      console.log(data)
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchAccount = createAsyncThunk<DataRegister>(
    "account/fetchAccount",
    async (_, thunkAPI) => {
      const account = loadAccountStorage();
      
      thunkAPI.dispatch(setAccount(account));
      
      try {
        const data = await agent.Account.getAccountId(account.id);
        localStorage.setItem(
          "account",
          JSON.stringify({ ...account, account: data })
        );
       
        return data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    },
    {
      condition: () => {
        if (!localStorage.getItem("account")) return false;
      },
    }
  );
  

export const registerAccount = createAsyncThunk<any, RegisterInput>(
    'account/register',
    async (data, thunkAPI) => {
        try {
            let formData = new FormData();
            formData.append("Fullname", data.fullname);
            formData.append("Email", data.email);
            formData.append("Password", data.password);
            formData.append("PhoneNumber", data.phonenumber);
            formData.append("FormFiles", data.filefrom);
            formData.append("RoleID", "1");
            const result = await agent.Account.register(formData);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);
export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setRoleData:(state,action) => {
          state.roleData = action.payload;
        },
        setAccount: (state, action) => {
            state.account = action.payload.account;
            if (action.payload.token) state.token = action.payload.token;
          },
          setTingAccount: (state, action) => {
            const { account, token } = action.payload;
            localStorage.setItem(
              "account",
              JSON.stringify({
                account: account,
                token: token,
              })
            );
          },
          logout: (state) => {
            state.token = null;
            state.account = null;
            localStorage.removeItem("account");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAccount.fulfilled, (state, action) => {
            if (action.payload) {
                state.account = action.payload.data;
                state.token = action.payload.token;
            };
        });

        builder.addCase(fetchAccountAll.fulfilled, (state, action) => {
          state.accountAll = action.payload;
          console.log(action.payload)
          state.accountLoaded = true
        });
    },
    


});


export const {setTingAccount,setAccount,logout,setRoleData } = accountSlice.actions