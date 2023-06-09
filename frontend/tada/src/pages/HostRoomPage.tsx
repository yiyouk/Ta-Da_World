import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores';
import { changecode } from '../stores/host';
import { set } from '../stores/game';
import Swal from 'sweetalert2';

import HostCreateRoom from '../components/hostroom/HostCreateRoom';
import HostWaitRoom from '../components/hostroom/HostWaitRoom';
import HostGameRoom from '../components/hostroom/HostGameRoom';
import HostEndRoom from '../components/hostroom/HostEndRoom';
import useLogout from '../hooks/useLogout';
import useApi from '../hooks/useApi';

function HostRoomPage(): JSX.Element {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const accessToken = useSelector((state: RootState) => state.host.accessToken);
	const status = useSelector((state: RootState) => state.host.status);
	const logout = useLogout();
	const roomstatusApi = useApi(); //방 상태 조회
	const roomInfoApi = useApi();

	useEffect(()=>{
		if(!accessToken){
			logout.handleLogout();
		}
	}, []);

	useEffect(()=>{
		roomInfoApi.fetchNotBodyApiWithToken('GET', '/rooms');
	}, [status]);

	useEffect(() => {
		if(roomstatusApi.data?.success){
			const code = roomstatusApi.data.data.code;
			const status = roomstatusApi.data.data.status;
			const accessToken = '';
			dispatch(changecode({accessToken, status, code}));
		} else if(roomstatusApi.data){
			Swal.fire({
				icon: 'warning',               
				width: 300,
				iconColor: '#2BDCDB',
				text: '방 조회 실패', 
				confirmButtonColor: '#2BDCDB',
				confirmButtonText: '확인',
			});
			navigate('/hosthome');
		}
	}, [roomstatusApi.data]);


	useEffect(()=>{
		if(roomInfoApi.data?.success){
			const name = roomInfoApi.data.data.name;
			const playTime =roomInfoApi.data.data.playTime;
			const startTime = roomInfoApi.data.data.startTime;
			const roomId = roomInfoApi.data.data.id;
			dispatch(set({name, playTime, startTime, roomId}));
		}
	}, [roomInfoApi.data]);

	return (
		<>
			{status===1 && <HostCreateRoom/>}
			{status===2 && <HostWaitRoom/>}
			{status===3 && <HostGameRoom/>}
			{status===4 && <HostEndRoom/>}
		</>
	);
}

export default HostRoomPage;
