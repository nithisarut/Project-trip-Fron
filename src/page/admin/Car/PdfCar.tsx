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
import { Car } from "../../../app/models/Car";
import myCustomFont from "./IBMPlexSansThaiLooped-Medium.ttf";

  //Font.register({ family: "My Custom Font", src: ""+ myCustomFont });
  //Font.register({ family: "My Custom Font",src:"/cs63/s07/Project-End/"+ myCustomFont });
  Font.register({ family: "My Custom Font", src:"/cs63/s07/Project-End/" + myCustomFont });
  interface Prop {
    car: Car;
  }
  
  // Create Document Component
  function PdfCar({ car }: Prop) {
    const createTableHeader = (): JSX.Element => {
      return (
        <>
          <View style={styles.tableRow} fixed>
            <View style={styles.tableColHeader}>
              <Text>ชื่อคนขับ</Text>
            </View>
            <View style={styles.tableColHeaderA}>
              <Text>รุ่นรถ</Text>
            </View>
            <View style={styles.tableColHeaderA}>
              <Text>ทะเบียน</Text>
            </View>
           
            <View style={styles.tableColHeaderA}>
              <Text>บริษัท</Text>
            </View>
            <View style={styles.tableColHeaderA}>
              <Text>สถานะ</Text>
            </View>
           
          </View>
          {React.Children.toArray(car?.data.map((item) => { return<>
            <View style={styles.tableRow} key={item.vehicleID}>
                  <View style={styles.tableCol}>
                    <Text>{item.driverName}</Text>
                  </View>
                  <View style={styles.tableColA}>
                    <Text>{item.vehicleName}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{item.vehicleRegistration}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{item.company}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{!item.status ? "ว่าง": "ไม่ว่าง"} </Text>
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
      tableColHeaderA: {
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
      tableCol: {
        width: "80%",
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
            <Text>รายชื่อสถานที่</Text>
            <View style={styles.table}>{createTableHeader()}</View>
          </Page>
        </Document>
      </>
    );
  }
  
  export default PdfCar;