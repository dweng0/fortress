import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NumberRow = ({ numbers, ...props }) => {
	if (numbers.length !== 3) {
		throw new Error('Each row only takes 3 numbers!');
	}

	const getNumber = (number, index) => {
		return <NumberColumn key={index} numberInput={number} {...props} />;
	};
	let numberContent = [];
	numbers.forEach((num, i) => numberContent.push(getNumber(num, i)));
	return <View style={sheet.row}>{numberContent}</View>;
};

const NumberColumn = ({ numberInput, onPress, numberElement, ...props }) => {
	const getContent = () => {
		if (numberElement) {
			return numberElement;
		} else {
			return (
				<TouchableOpacity onPress={() => onPress(numberInput)}>
					<Text style={sheet.numberFont}>{numberInput}</Text>
				</TouchableOpacity>
			);
		}
	};
	return getContent();
};

const NumberPad = ({
	value,
	numberElement,
	onChangeText,
	onSubmitEditing,
	...props
}) => {
	let padValue = value || '';
	const submit = onSubmitEditing
		? onSubmitEditing
		: () => {
				console.warn(
					'no submit interface provided, please add the "onSubmitEditing" prop as an fn '
				);
		  };

	const onChange = onChangeText
		? onChangeText
		: () => {
				console.warn('no onChangeText prop provided, please add it');
		  };
	const onNumberPress = number => {
		if (number === 'DEL') {
			return onBackPressed();
		}

		if (number === 'OK') {
			return submit(padValue);
		}
		padValue = `${padValue}${number}`;
		onChange(padValue);
	};

	const onBackPressed = () => {
		if (padValue) {
			padValue = padValue.slice(0, padValue.length - 1);
			onChange(padValue);
		}
	};

	return (
		<View style={sheet.container}>
			<NumberRow onPress={onNumberPress} numbers={[1, 2, 3]} {...props} />
			<NumberRow onPress={onNumberPress} numbers={[4, 5, 6]} {...props} />
			<NumberRow onPress={onNumberPress} numbers={[7, 8, 9]} {...props} />
			<NumberRow
				onPress={onNumberPress}
				numbers={['DEL', 0, 'OK']}
				{...props}
			/>
		</View>
	);
};

const sheet = StyleSheet.create({
	row: {
		flex: 1,
		width: '100%',
		height: '25%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	numberFont: {
		fontSize: 24,
		paddingTop: '8.5%',
		minWidth: '30%',
		height: '100%',
		textAlign: 'center'
	},
	container: {
		flex: 3,
        justifyContent: 'space-between'       
	}
});
export default NumberPad;
