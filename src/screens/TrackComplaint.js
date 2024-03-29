import { Text, View, ScrollView, SafeAreaView, Image, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useListComplaintQuery } from '../../services/complaintApi';
import TcDetails from '../components/TcDetails';



const CommunityForums = ({ navigation }) => {

	const token = useSelector(state => state.auth);
	const { data, isSuccess, error, isLoading, refetch } = useListComplaintQuery(token.access_token);
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
			refetch();
		}, 2000);
	}, []);



	if (isLoading) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#50C2C9" />
			</View>
		)
	}
	else if (isSuccess) {
		return (
			<SafeAreaView className="flex-1 px-2">
				<Text className="text-2xl text-center font-semibold text-gray-700">Track Complaints</Text>
				<ScrollView className="" refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}>

					{data.map((item => (
						<TcDetails key={item.id} item={item} token={token.access_token} />
					)))}

				</ScrollView>
				<Button title="Login" mode='outlined'
					labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
					textColor="white"
					style={{ backgroundColor: '#50C2C9', width: '100%', marginVertical: 10, borderColor: '#50C2C9', borderRadius: 25, borderWidth: 2 }}
					onPress={() => { navigation.navigate('RegisterComplaints') }}
				>Register Complaint</Button>
			</SafeAreaView>

		);
	} else if (error) {
		console.log(error);
		return <Text className="flex-1">Error....</Text>
	}
}

export default CommunityForums