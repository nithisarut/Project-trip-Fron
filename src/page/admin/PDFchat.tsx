import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";


import myCustomFont from "./Trip/IBMPlexSansThaiLooped-Medium.ttf";
import { ReportData } from "../../app/models/Report";

//Font.register({ family: "My Custom Font", src:myCustomFont });
Font.register({ family: "My Custom Font", src:"/cs63/s07/Project-End/" + myCustomFont });

interface Props {
  data: ReportData | null;
  year : any | null;
}

function getMonthName(month: number): string {
  const monthNames: string[] = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม'
  ];

  if (month >= 1 && month <= 12) {
    return monthNames[month - 1];
  } else {
    return "error"
  }
}

function PdfChart({ data , year }: Props) {
  const createTableHeader = (): JSX.Element => {
    console.log(JSON.stringify(data, null, 2));
    
    return (
      <>
        <View style={styles.tableRow} fixed>
          <View style={styles.tableColHeaderB}>
            <Text>เดือน </Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>รายได้รวม(ต่อเดือน)</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>คิดเป็นเปอร์เซ็น</Text>
          </View>
        </View>

        <>
          {
            data && data?.trip?.length > 0 ? data.trip.map(e =>  <View style={styles.tableRow}>
              <View style={styles.tableColB}>
                <Text>{getMonthName(e.month)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text> {new Intl.NumberFormat().format(e.price as any)} บาท </Text>
              </View>
              <View style={styles.tableColA}>
                <Text>{e.percent.toFixed(2)}%</Text>
              </View>
            </View>) : <>
            <View style={styles.tableRow}>
              <View style={styles.tableColB}>
                <Text>{"ไม่มีรายได้"}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{"ไม่มีรายได้"} </Text>
              </View>
              <View style={styles.tableColA}>
                <Text>{"ไม่มีรายได้"}</Text>
              </View>
            </View></>
          }
           
          
          <View style={styles.tableRow}>
            <View style={styles.tableColC}>
              <Text>รายได้รวมต่อปี </Text>
            </View>
            <View style={styles.tableColA}>
              <Text> {new Intl.NumberFormat().format(data?.totalPrice as any)} บาท</Text>
            </View>
          </View>
        </>
      </>
    );
  };

  const styles = StyleSheet.create({
    pageStyle: {
      paddingTop: 16,
      paddingHorizontal: 40,
      paddingBottom: 56,
      fontFamily: "My Custom Font",
    },

    tableRow: {
      flexDirection: "row",
    },

    tableColHeader: {
      width: "25%",
      textAlign: "center",
      fontSize: "12px",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      backgroundColor: "#C6C6C6",
      padding: 5,
    },
    tableColHeaderA: {
      width: "50%",
      textAlign: "center",
      fontSize: "12px",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      backgroundColor: "#C6C6C6",
      padding: 5,
    },
    tableColHeaderB: {
      width: "33.3%",
      textAlign: "center",
      fontSize: "12px",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      backgroundColor: "#C6C6C6",
      padding: 5,
    },
    tableCol: {
      width: "25%",
      fontSize: "12px",
      textAlign: "center",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 3,
    },
    tableColA: {
      width: "50%",
      fontSize: "12px",
      textAlign: "center",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
    },
    tableColB: {
      width: "33.25%",
      fontSize: "12px",
      textAlign: "center",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
    },
    tableColC: {
      width: "58.33%",
      fontSize: "12px",
      borderStyle: "solid",
      textAlign: "center",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
    },
    table: {
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      borderBottomWidth: 0,
      borderRightWidth: 0,
    },
  });


  return (
    <>
      <Document>
        <Page style={styles.pageStyle} size="A4" orientation="portrait">
          <Text>รายได้ปี {year ? year : data?.trip[0]?.year}</Text>
          <View style={styles.table}>{createTableHeader()}</View>
        </Page>
      </Document>
    </>
  );
}

export default PdfChart;