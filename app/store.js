import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { produce } from "immer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { customAlphabet } from "nanoid/non-secure"
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10)

export const useStore = create(
	persist(
		(set, get) => ({
			starred: [],
			lists: [],
			addNewList: listName =>
				set(
					produce(state => {
						state.lists.push({
							_id: nanoid(10),
							title: listName,
							createdAt: Date.now(),
							tasks: []
						})
						for (const list of state.lists) {
							list._id = nanoid(10)
						}
					})
				)
		}),
		{
			name: "routines-app",
			storage: createJSONStorage(() => AsyncStorage)
		}
	)
)
