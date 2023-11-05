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
import { LocationTrip } from "../../../app/models/Location";

  //Font.register({ family: "My Custom Font", src:""+ myCustomFont });
  //Font.register({ family: "My Custom Font",src:"/cs63/s07/Project-End/"+ myCustomFont });
  Font.register({ family: "My Custom Font", src:"/cs63/s07/Project-End/" + myCustomFont });
  interface Prop {
    location: LocationTrip;
  }
  
  // Create Document Component
  function PdfLocation({ location }: Prop) {
    const createTableHeader = (): JSX.Element => {
      return (
        <>
          <View style={styles.tableRow} fixed>
            <View style={styles.tableColHeader}>
              <Text>ชื่อสถานที่</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>ตำบล</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>อำเภอ</Text>
            </View>
           
            <View style={styles.tableColHeader1}>
              <Text>ประเภท</Text>
            </View>
           
           
          </View>
          {React.Children.toArray(location?.data.map((item) => { return<>
            <View style={styles.tableRow} key={item.locationID}>
                  <View style={styles.tableCol1}>
                    <Text>{item.locationName}</Text>
                  </View>
                  <View style={styles.tableCol2}>
                    <Text>{item.district}</Text>
                  </View>
                  <View style={styles.tableCol3}>
                    <Text>{item.subDistrict}</Text>
                  </View>
                  <View style={styles.tableCol4}>
                    <Text>{item.typeName}</Text>
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
        width: "20%",
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
        width: "40%",
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
        width: "20%",
        fontSize: "8px",
      
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        padding: 3,
      },
      tableCol2: {
        width: "20%",
        fontSize: "8px",
      
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        padding: 3,
      },
      tableCol3: {
        width: "20%",
        fontSize: "8px",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        padding: 5,
      },
      tableCol4: {
        width: "40%",
        fontSize: "8px",
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
  
  export default PdfLocation;