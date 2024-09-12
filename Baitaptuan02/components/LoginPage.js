import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import {BASE_URL} from "./config.js";

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        fetch(`${BASE_URL}/api/auth/login`, {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Gửi dữ liệu người dùng
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Đăng nhập thành công!");
                navigation.replace("Home");  // Chuyển đến trang chính
            } else {
                alert("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        });
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input} 
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address"
            />

            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput 
                style={styles.input} 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry
            />

            <Button title="Đăng nhập" onPress={handleLogin} />

            {/* Nút để chuyển qua trang Đăng ký */}
            <View style={styles.registerContainer}>
                <Text>Chưa có tài khoản?</Text>
                <Button title="Đăng ký" onPress={() => navigation.navigate("Register")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    registerContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});
