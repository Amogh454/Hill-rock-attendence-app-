import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import db from '../config';


class SummaryScreen extends React.Component{
 constructor() {
    super();
    this.state = {
      all_students: [],
      present_students: [],
      absent_students: [],
    };
  }

  getTodaysDate(){
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
    return today;
  }

  componentDidMount = async () => {
    var today = await this.getTodaysDate();

    var students_ref = db.ref('/').on('value',(data)=>{
      var class_a = data.val();
      var present_students = []
      var absent_students = []
      for(var i in class_a){
        if(class_a[i][today] === 'present'){
          present_students.push(class_a[i])
        }
        if(class_a[i][today] === 'absent'){
          absent_students.push(class_a[i])
        }
      }

      present_students.sort(function(a, b) {
        return a.roll_no - b.roll_no;
      });
  
      absent_students.sort(function(a, b) {
        return a.roll_no - b.roll_no;
      });

      this.setState({
        present_students : present_students,
        absent_students : absent_students
      })
    })
  };

  render() {
    return (
      <View style={styles.whole}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>

         
              <TouchableOpacity 
          onPress={() => {
            this.props.navigation.navigate('HomeScreen');
          }}>
          <Image
            style={styles.back}
            source={require('../backB.png')}
          />
             </TouchableOpacity>
        </View>
         <Text style={styles.line}>______________________________________________________</Text>
            
    
   
     
            
        <Text style={styles.title}>
     
        
        Present Students List</Text>
        <View style={styles.presentContainer}>
          {
            this.state.present_students.map((student, index)=>(
                <Text style={{fontSize:18}}>{student.name}</Text>
              )
            )
          }
          <Text>_______________________________________________________</Text>
        </View>
        <Text style={styles.title}>Absent Students List</Text>

        <View style={styles.absentContainer}>
          {
            this.state.absent_students.map((student, index)=>(
                <Text style={{fontSize:18}}>{student.name}</Text>
              )
            )
          }
          <Text>_______________________________________________________</Text>
        </View>
        <View style={{flex:0.1, flexDirection:'row', justifyContent:'space-around', marginTop:'40'}}>
          <Text style={styles.present}>Present: {this.state.present_students.length}</Text>
          <Text style={styles.absent}>Absent: {this.state.absent_students.length}</Text>
        </View>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  presentContainer: {
  
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
  },

   back: {
    width: 40,
    height: 30,
    marginBottom: 28,
 
  },
  absentContainer :{
    
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:0,
  },
  title:{
    fontSize:20, 
    fontWeight:'bold',
    alignSelf:'center', 
    marginBottom:18,
    marginTop:10,
    //display: 'flex',
    //flexDirection:'row',
    marginLeft: 0,


  },
  present:{
    marginTop:20,
    fontSize:20
  },
    absent:{
    marginTop:20,
    fontSize: 20,
    marginBottom:20,
  }, 
  whole:{
    backgroundColor:'pink',
  },
  line:{
    textAlign:'center',
  },


});


export default SummaryScreen;