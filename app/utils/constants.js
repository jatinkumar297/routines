export const COLORS = {
	HIGHLIGHT_THEME: "#313743",
	DARK_PRIMARY: "#121212",
	DARK_SECONDARY: "#4b4c4e",
	DARK_MODAL: "#27282c",
	DARK_MODAL_SECONDARY: "#1b1b1b",
	DARK_HIGHLIGHT: "#343537",
	DARK_BOTTOM_BG: "#1e1f21",
	FONT_PRIMARY: "#dfdfdf",
	FONT_HIGHLIGHT: "#c2c4c6",
	FONT_LIGHT: "#b2b5b9",
	DANGER: "#f4bbb7",
	BORDER: "#454646",
	THEME: "#a9c7f9",
	THEME_SEMI: "#a9c8fa10",
	THEME_DARK: "#082c69",
	OVERLAY: "#00000045"
}

export const theme_colors = {
	background: "rgb(17, 17, 17)",
	border: "rgb(93, 95, 100)",
	card: "rgb(66, 66, 66)",
	notification: "rgb(30, 31, 33)",
	primary: "rgb(169, 200, 250)",
	text: "rgb(210, 210, 210)"
}

export const FONT = {
	xxLarge: 24,
	xLarge: 22,
	large: 20,
	medium: 17,
	normal: 16,
	default: 15,
	regular: 14.5,
	small: 14,
	xSmall: 12,
	xxSmall: 10
}

export const weekDays = ["S", "M", "T", "W", "T", "F", "S"]
export const defaultHPadding = 18

export const getCalenderData = today => {
	const currentMonth = today.getMonth()
	const currentYear = today.getFullYear()

	let currentDate = new Date([currentYear, currentMonth + 1, "01"].join("-"))
	currentDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60 * 1000 * 2)

	const currentMonthFirstDay = currentDate.getUTCDay()

	const calendar = []
	const months = [31, currentYear % 4 ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	for (let i = 0; i < 12; i++) {
		const month = (currentMonth + i + 12) % 12
		const year = currentYear + (currentMonth + i >= 12 ? 1 : 0)

		const monthData = {
			month: month,
			year,
			daysInMonth: months[month],
			startDay:
				month === currentMonth
					? currentMonthFirstDay
					: (months.slice(0, month)?.reduce((a, b) => a + b, 0) % 7, 0) + 1
		}

		monthData.weeks = Array(6)
			.fill()
			.map((_, week) =>
				Array(7)
					.fill()
					.map((_, day) => {
						const date = 7 * week + day - monthData.startDay + 1
						if ((week === 0 && day < monthData.startDay) || date > monthData.daysInMonth) return null
						else return date
					})
			)
			?.filter(i => i.some(_i => _i))

		calendar.push(monthData)
	}

	return calendar
}
