import { persist, devtools } from 'zustand/middleware';
import create from 'zustand';
import { Images } from '../../../app/models/Images';
import agent from '../../../app/api/agent';

interface Types {
   ImageDetail :Images[],
   AddImage :(id:any) => void
};

let store: any = (set: any) => {
    return {
        ImageDetail:[],
        AddImage: async (id : any) => {
           const { data } = await agent.Images.getByIdImages(id);
           set((state : any) => ({ImageDetail :  data}));
        }
    }
};

store = devtools(persist(store, { name: "image" }));

const useImageDetail = create<Types>(store);

export default useImageDetail;



