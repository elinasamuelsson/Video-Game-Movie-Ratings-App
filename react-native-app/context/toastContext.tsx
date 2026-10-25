import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";

import Toast from "../components/Toast";

type ToastState = {
	message: string | null;
	isVisible: boolean;
};

type ToastAction = {type: "SHOW"; payload: string} | {type: "HIDE"};

type ToastContextValue = {
	toast: ToastState;
	dispatch: Dispatch<ToastAction>;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

const initialState: ToastState = {message: null, isVisible: false};

function toastReducer(toast: ToastState, action: ToastAction): ToastState {
	switch (action.type) {
		case "SHOW":
			return {message: action.payload, isVisible: true};
		case "HIDE":
			return {message: null, isVisible: false};
		default:
			return toast;
	}
}

export function ToastProvider({children}: {children: ReactNode}) {
	const [toast, dispatch] = useReducer(toastReducer, initialState);

	return (
		<ToastContext.Provider value={{toast, dispatch}}>
			{children}
			{toast.isVisible && toast.message && (
				<Toast message={toast.message} onHide={() => dispatch({type: "HIDE"})} />
			)}
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) throw new Error("useToast must be used within ToastProvider.");
	return context;
}
