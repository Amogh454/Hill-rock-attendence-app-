import * as React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Button, ScrollView, } from 'react-native';
import AppHeader from '../components/AppHeader';
import db from '../config';

export default class HomeScreen extends React.Component{
  constructor() {
 
    super();
    this.state = {
      all_students: [],
      presentPressedList: [],
      absentPressedList: [],
    };
  }

  componentDidMount = async() => {
    var class_ref =await db.ref('/').on('value', data => {
      var studentlist =  []
      var class_8C = data.val();
      for (var student in class_8C) {
        studentlist.push(class_8C[student]);
      }
      studentlist.sort(function(n_1, n_2) {
           return n_1.roll_no - n_2.roll_no;
      });
      this.setState({   all_students: studentlist});
      //console.log(all_students);
    });
  };

  updateAttendence(roll_no, status) {
    var id = '';
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
  }


 

  
goToSummary = ()=>{
    this.props.navigation.navigate('NextScreen')
  }


render(){
  var all_students = this.state.all_students;
    if (all_students.length === 0) {
      return (
             <ScrollView>
             
        <View
          
      
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No Student Found</Text>
        
        </View>
        </ScrollView>
      );
    } else{
   return (
     <ScrollView>
        <View style={styles.container}>
             <AppHeader/>
          <View style={{ flex: 3 }}>
            {all_students.map((student, index) => (
              <View key={index} style={styles.studentChartContainer}>

              
                  <View
                  key={'name' + index}
                  style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold',marginRight: 10 }}>
                    {student.roll_no}.
                  </Text>
                  <Text style={{ fontSize: 14, fontWeight:'bold' }}>{student.name}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  
                  <TouchableOpacity
                    style={
                      this.state.presentPressedList.includes(index)
                        ? [styles.presentButton, { backgroundColor: 'lightgreen' }]
                        : styles.presentButton
                    }
                    onPress={() => {
                      var presentPressedList = this.state.presentPressedList;
                      presentPressedList.push(index);
                      this.setState({ presentPressedList: presentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'present');
                    }}>
                    <Text>P</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={
                      this.state.absentPressedList.includes(index)
                        ? [styles.absentButton, { backgroundColor: 'red' }]
                        : styles.absentButton
                    }
                    onPress={() => {
                      var absentPressedList = this.state.absentPressedList;
                      absentPressedList.push(index);
                      this.setState({ absentPressedList: absentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'absent');
                    }}>
                    <Text>A</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.footer}
              onPress={() => {
                this.props.navigation.navigate('SummaryScreen');
              }}>
              <Text style={styles.subm}>See Today's Class Strength 👉</Text>
            </TouchableOpacity>
          </View>
          </View>
          
        </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  studentChartContainer: {
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
    margin: 14,
    marginLeft:4,
  
  
  },
  presentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 3,
        borderRadius:10,

  },
  absentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius:10,
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    marginTop:8,  
      
       
  },
  subm:{
    fontSize:20,
    padding:2,
    fontWeight:'bold',
    color:'blue',
  }
});
