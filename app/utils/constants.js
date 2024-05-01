export const defaultHPadding = 18

export const cycleUnits = {
	day: "Daily",
	week: "Weekly",
	month: "Monthly",
	year: "Anually"
}

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

let today = new Date()
today = new Date(today.getTime() - today.getTimezoneOffset() * 60 * 1000)

export const currentDate = {
	year: today.getFullYear(),
	month: today.getMonth(),
	date: today.getUTCDate(),
	day: today.getUTCDay(),
	first: 0,
	week: 0
}

currentDate.first = currentDate.day - (currentDate.date % 7) + 1
currentDate.week =
	Math.floor(currentDate.date / 7) + Math.floor(((currentDate.date % 7) + currentDate.first) / 7) - 1

export const weekFullDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export const weeksInWords = ["First", "Second", "Third", "Fourth", "Last"]

export const weekDays = weekFullDays.map(i => i[0])

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
]

export const getCalenderData = () => {
	const currentMonth = today.getMonth()
	const currentYear = today.getFullYear()

	let currentDate = new Date([currentYear, currentMonth + 1, "01"].join("-"))
	currentDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60 * 1000 * 2)

	const currentMonthFirstDay = currentDate.getUTCDay()

	const calendar = []
	const nextYearMonths = [31, (currentYear + 1) % 4 ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	const months = [31, currentYear % 4 ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31].concat(nextYearMonths)

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
					: (months.slice(currentMonth, currentMonth + i)?.reduce((a, b) => a + b, 0) % 7) + 1
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

export const getDay = ({ year, month, date }) =>
	new Date([year, (month + 1).toString().padStart(2, "0"), date.toString().padStart(2, "0")].join("-")).getDay()

export const generateTimeString = time => `${time.hours}:${time.minutes} ${time.indicator ? "PM" : "AM"}`
export const generateDateTimeString = (date, time) =>
	`${weekFullDays[getDay(date)]?.slice(0, 3)}, ${date.date} ${months[date.month].slice(0, 3)}${
		date.year === currentDate.year ? "" : ", " + date.year
	}` + (time?.hours ? ", " + generateTimeString(time) : "")

export const generateRepeatsString = repeats =>
	!repeats
		? ""
		: (+repeats.every.cycleInterval > 1
				? `Every ${repeats.every.cycleInterval} ${repeats.every.intervalUnit}s`
				: cycleUnits[repeats.every.intervalUnit]) +
		  (repeats.every.intervalUnit === "week"
				? " on " +
				  weekFullDays
						.slice(Math.min(...repeats.every.weekDays), Math.max(...repeats.every.weekDays) + 1)
						.map(i => (repeats.every.weekDays.length > 1 ? i.slice(0, 3) : i))
						.join(", ")
				: repeats.every.intervalUnit === "month"
				? ` (on ${
						repeats.every.date
							? "day " + repeats.every.date
							: `every ${weeksInWords[repeats.every.week]} ${weekFullDays[repeats.every.day]}`
				  })`
				: "") +
		  (repeats.every.time ? `, ${generateTimeString(repeats.every.time)}` : "") +
		  (repeats.ends.date
				? `, until ${repeats.ends.date.date}/${repeats.ends.date.month}/${repeats.ends.date.year}`
				: repeats.ends.after
				? `, ${repeats.ends.after} times`
				: "")
