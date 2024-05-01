import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { produce } from "immer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import methods from "./methods"

const useStore = create(
	persist(
		set => ({
			starred: [],
			tasks: [],
			lists: [
				{
					_id: 1,
					title: "My tasks",
					createdAt: Date.now()
				}
			],
			...Object.keys(methods).reduce(
				(obj, key) => ({
					...obj,
					[key]: (...params) =>
						set(
							produce(state => {
								methods[key](state, ...params)
							})
						)
				}),
				{}
			)
		}),
		{
			name: "tasks-app",
			storage: createJSONStorage(() => AsyncStorage)
		}
	)
)

export default useStore
