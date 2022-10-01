import React, { useState } from "react";
import { View, TextInput, StyleSheet, Modal, Alert } from 'react-native';
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ modal, onCancel, value, onSave}) => {
const [title, set_title] = useState(value)

const saveHandler = () => {
    if(title.trim().length < 3){
      Alert.alert(
        'Помилка!',
        `Мінімальна довжина назви 3 символів. Зараз ${title.trim().length} символа.`
      )
    } else {
        onSave(title)
    }
}

const handlerCancel = () => {
  set_title(value)
  onCancel()
}

    return(
        <Modal visible={modal} animationType='slide' transparent={false}>
            <View style={styles.wrap}>
                <TextInput style={styles.input} value={title} onChangeText={set_title}
                autoCapitalize="none" autoCorrect={false} maxLength={64}/>
                <View style={styles.buttons}>
                <AppButton onPress={handlerCancel} color={THEME.DANGER_COLOR}>Відмінити</AppButton>
                <AppButton onPress={saveHandler}>Зберігти</AppButton>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
    alignContent: "center",
    marginLeft: '10%'
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  }
})