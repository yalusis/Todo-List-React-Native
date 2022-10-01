import React, { useContext, useEffect, useState, useCallback } from 'react'
import {StyleSheet, View, FlatList, Image, Dimensions} from "react-native"
import { Todo } from '../components/Todo'
import { THEME } from '../theme'
import { AppButton } from '../components/ui/AppButton'
import { AddTodo } from '../components/AddTodo'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'
import { AppLoader } from '../components/ui/AppLoader'
import { AppTextBold } from '../components/ui/AppTextBold'

export const MainScreen = () => {
  const {todo, addTodo, removeTodo, fetchTodos, loading, error} = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext)
  const [deviceWidth, set_deviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZINTAL * 2)

  const loadTodos = useCallback( async () => await fetchTodos(), [fetchTodos])

  useEffect(() => {
    loadTodos()
  }, [])

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZINTAL * 2;
      set_deviceWidth(width)
    }

    Dimensions.addEventListener("change", update)
  }, [])

  if (loading) {
    return <AppLoader />
  }

  if (error) {
    return (
    <View style={styles.center}>
      <AppTextBold style={styles.error}>{error}</AppTextBold>
      <AppButton onPress={loadTodos}>Повторити</AppButton>
      </View>
    )
  }

  let content = (
    <View style={{ width: deviceWidth }}>
    <FlatList 
    keyExtractor={item => item.id}
    data={todo}
    renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>} />
    </View>
  )

  if(todo.length == 0){
    content = (
      <View style={styles.imageWrapper}>
       <Image style={styles.image} source={require('../../assets/no-item.png')}/>
      </View>
    ) 
  }

  return (
    <View>
           <AddTodo onSubmit={addTodo} />
           {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrapper: {
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
    height: 300
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR
  }
})
