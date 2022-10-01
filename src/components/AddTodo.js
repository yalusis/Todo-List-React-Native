import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Alert, Keyboard } from 'react-native'
import { THEME } from '../theme'
import { AntDesign } from '@expo/vector-icons'

export const AddTodo = ({ onSubmit }) => {
  const [value, set_value] = useState('')

  const ClickHandle = () => {
    if(value.trim()){
      onSubmit(value);
      set_value('')
      Keyboard.dismiss()
    } else {
      Alert.alert("Назва справи не може бути пустим")
    }
  }

  return (
    <View style={styles.block}>
     <TextInput style={styles.input} 
     onChangeText={text => set_value(text)}
     value={value}
     autoCorrect={false}
     autoCapitalize="sentences"
     placeholder="Введіть назву справи..."/>
     <AntDesign.Button onPress={ClickHandle} name="pluscircleo">
      Добавити
     </AntDesign.Button>
    </View>
  )
}

const styles = StyleSheet.create({
    block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
    },
    input: {
    width: '60%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
    padding: 10
    }
})
