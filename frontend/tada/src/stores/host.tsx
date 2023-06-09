// 액션 타입을 선언합니다
// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 'counter/INCREASE' 와 같이 실제 문자열 값으로 추론 되도록 해줍니다.
const CHANGE = 'host/CHANGE' as const;
const CHANGECODE = 'host/CHANGECODE' as const;
const LOGIN = 'host/LOGIN' as const;
const LOGOUT = 'host/LOGOUT' as const;
const REFRESH = 'host/REFRESH' as const;

// 액션 생성함수를 선언합니다
export const change = (roomNumber: number) => ({
	type: CHANGE,
	payload: roomNumber,
});

// 액션 생성함수를 선언합니다
export const changecode = (hostData: HostState) => ({
	type: CHANGECODE,
	payload: hostData,
});

export const login = ( hostData: HostState ) => ({
	type: LOGIN,
	payload: hostData,

});

export const logout = () => ({
	type: LOGOUT,
});

export const refresh = ( accessToken: string ) => ({
	type: REFRESH,
	payload: accessToken,
});
// 모든 액션 겍체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
// 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
type HostAction =
	| ReturnType<typeof change>
	| ReturnType<typeof changecode>
	| ReturnType<typeof login>
	| ReturnType<typeof refresh>
	| ReturnType<typeof logout>;

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
type HostState = {
	accessToken: string;
	status:number;
	code:string;
};

// 초기상태를 선언합니다.
const initialState: HostState = {
	status: 0,
	accessToken: '',
	code:''
};

// 리듀서를 작성합니다.
// 리듀서에서는 state 와 함수의 반환값이 일치하도록 작성하세요.
// 액션에서는 우리가 방금 만든 CounterAction 을 타입으로 설정합니다.
function host(state: HostState = initialState, action: HostAction): HostState {
	switch (action.type) {
	case REFRESH:
		return { status: state.status, accessToken: action.payload , code: state.code};
	case CHANGE:
		return { status: action.payload, accessToken: state.accessToken, code: state.code};
	case CHANGECODE:
		return { status: action.payload.status, accessToken: state.accessToken, code:action.payload.code};
	case LOGIN:
		return { status: action.payload.status , accessToken: action.payload.accessToken, code: action.payload.code};
	case LOGOUT:
		return { status: -1, accessToken: '' , code: ''};
	default:
		return state;
	}
}

export default host;
