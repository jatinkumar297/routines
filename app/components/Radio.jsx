import React from "react"
import { ThemeButton } from "./ThemeComponents"
import { COLORS, FONT } from "../utils/constants"
import LottieView from "lottie-react-native"

const Radio = ({ flags, handleFlags, field, value }) => {
	const progressed = !flags?.lastField
	const render = flags?.lastField === field && [flags?.[field], flags?.lastValue].includes(value)
	const checked = flags?.[field] === value

	return (
		<ThemeButton
			rippleRadius={22}
			rippleColor={COLORS.DARK_SECONDARY}
			_containerStyle={{ alignSelf: "center" }}
			style={{ padding: 5 }}
			onPress={() => handleFlags(field, value)}
		>
			<LottieView
				speed={1.75}
				source={
					checked
						? require("../../assets/animations/Radio-Check.json")
						: require("../../assets/animations/Radio-Uncheck.json")
				}
				style={{ width: FONT.large, height: FONT.large }}
				loop={false}
				autoPlay={render}
				{...(!render || (progressed && checked) ? { progress: 1 } : {})}
			/>
		</ThemeButton>
	)
}

export default Radio
