import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Font,
  } from "@react-pdf/renderer";
import React from "react";

  import myCustomFont from "./IBMPlexSansThaiLooped-Medium.ttf";

import { Trip } from "../../../app/models/Trip";

  //Font.register({ family: "My Custom Font", src:""+ myCustomFont });
  //Font.register({ family: "My Custom Font",src:"/cs63/s07/Project-End/"+ myCustomFont });
  Font.register({ family: "My Custom Font", src:"/cs63/s07/Project-End/" + myCustomFont });
  interface Prop {
    trip: Trip;
  }
  
  // Create Document Component
  function PdfTrip({ trip }: Prop) {
    const createTableHeader = (): JSX.Element => {
      return (
        <>
          <View style={styles.tableRow} fixed>
            <View style={styles.tableColHeader}>
              <Text>ชื่อ</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>ราคา</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>จำนวนที่รับ</Text>
            </View>
           
            <View style={styles.tableColHeader}>
              <Text>ระดับ</Text>
            </View>
           
           
          </View>
          {React.Children.toArray(trip?.data.map((item) => { return<>
            <View style={styles.tableRow} key={item.id}>
                  <View style={styles.tableCol1}>
                    <Text>{item.tripName}</Text>
                  </View>
                  <View style={styles.tableCol2}>
                    <Text>{item.price}</Text>
                  </View>
                  <View style={styles.tableCol3}>
                    <Text>{item.amount}</Text>
                  </View>
                  <View style={styles.tableCol4}>
                    <Text>{item.classTrip.name}</Text>
                  </View>
               
                
                  
                </View>
          </>}))}
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
        width: "80%",
        textAlign: "center",
        fontSize: "12px",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: "#f3f6f4",
        padding: 5,
      },
      tableColHeader1: {
        width: "80%",
        textAlign: "center",
        fontSize: "12px",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: "#f3f6f4",
        padding: 5,
      },
      tableCol1: {
        width: "80%",
        fontSize: "12px",
      
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        padding: 3,
      },
      tableCol2: {
        width: "80%",
        fontSize: "12px",
      
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        padding: 3,
      },
      tableCol3: {
        width: "80%",
        fontSize: "12px",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        padding: 5,
      },
      tableCol4: {
        width: "80%",
        fontSize: "12px",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        padding: 5,
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
            <Text>รายชื่อคนขับรถ</Text>
            <View style={styles.table}>{createTableHeader()}</View>
          </Page>
        </Document>
      </>
    );
  }
  
  export default PdfTrip;