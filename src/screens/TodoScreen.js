import React, { useContext, useState } from 'react'
import {StyleSheet, View, Dimensions } from "react-native"
import { EditModal } from '../components/EditModal'
import { AppButton } from '../components/ui/AppButton'
import { AppCard } from '../components/ui/AppCard'
import { AppTextBold } from '../components/ui/AppTextBold'
import { THEME } from '../theme'
import { FontAwesome, AntDesign } from "@expo/vector-icons"
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const TodoScreen = () => {
  const {todo,  removeTodo, updateTodo} = useContext(TodoContext)
  const {todoId, changeScreen} = useContext(ScreenContext)
  const [modal, set_modal] = useState(false)

  if(todo != undefined) {
    const current_todo = todo.find(item => item.id == todoId)

    const saveHandler = title => {
      updateTodo(current_todo.id, title)
      set_modal(false)
      }
    
      return (
        <View>
          <EditModal value={current_todo.title} modal={modal} onCancel={() => set_modal(false)} onSave={saveHandler}/>
    
          <AppCard style={styles.card}>
          <AppTextBold style={styles.title}>{current_todo.title}</AppTextBold>
          <AppButton onPress={() => set_modal(true)}>
            <FontAwesome name='edit' size={20} />
          </AppButton>
          </AppCard>
          
    
            <View style={styles.buttons}>
            <View style={styles.button}>
            <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
              <AntDesign name='back' size={20} color='#fff' />
            </AppButton>
            </View>
            <View style={styles.button}>
            <AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(current_todo.id)}>
              <FontAwesome name='remove' size={20} color='#fff'/>
            </AppButton>
            </View>
            </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, 
  button: {
    width: Dimensions.get('window').width / 2.8
  },
  card: {
    marginBottom: 25,
    padding: 15
  },
  title: {
    fontSize: 20
  }
})
