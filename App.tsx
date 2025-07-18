import {SafeAreaView, StatusBar, StyleSheet, Platform} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import './global.css';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Provider} from 'react-redux';
import {store} from '@/store/store';
import Pages from '@/pages/Page';

export default function App() {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{flex: 1}}>
                <NavigationContainer theme={MyTheme}>
                    <BottomSheetModalProvider>
                        <SafeAreaView style={styles.safeArea}>
                            <StatusBar barStyle="dark-content" backgroundColor="white" animated />
                            <Pages />
                        </SafeAreaView>
                    </BottomSheetModalProvider>
                </NavigationContainer>
            </GestureHandlerRootView>
        </Provider>
    );
}
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
    },
};
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});
