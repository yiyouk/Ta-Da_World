import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';
import DeleteHost from '../components/hosthome/DeleteHost';
import RoomState from '../components/hosthome/RoomState';

function HostHomePage(): JSX.Element {
	const roomState = useSelector((state: RootState) => state.host.roomState);
	console.log('Home' + roomState);

	return (
		<div className='h-full'>
			<div className='h-5/6 flex flex-col justify-center items-center'>
				<RoomState roomState={roomState} />
			</div>
			<DeleteHost />
		</div>
	);
}

export default HostHomePage;
