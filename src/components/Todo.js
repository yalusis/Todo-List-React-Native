import { AppTextRegular } from "./ui/AppTextRegular";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export const Todo = ({ todo, onRemove, onOpen }) => {
    return (
        <TouchableOpacity activeOpacity={0.5} 
        onPress={() => onOpen(todo.id)} 
        onLongPress={() => onRemove(todo.id)} >
            <View style={styles.todo}>
            <AppTextRegular>{todo.title}</AppTextRegular>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 5,
        marginBottom: 10,
    }
})