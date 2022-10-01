import React from "react";
import { View, StyleSheet } from "react-native";

export const AppCard = props => (
<View style={{...styles.default, ...props.style}}>{props.children}</View>
)

const styles = StyleSheet.create({
    default: {
    padding: 20,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignContent: "center",
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 9,
    backgroundColor: '#fff',
    borderRadius: 10
    }
})