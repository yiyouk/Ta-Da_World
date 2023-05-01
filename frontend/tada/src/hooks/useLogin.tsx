import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../stores/host';

interface LoginData {
  accessToken: string
  refreshToken: string
}

const useLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [data, setData] = useState<LoginData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [, setCookie, removeCookie] = useCookies(['accessToken']);
	
	// hostId, type
	const handleLogin = async (id: string, type: string) => {
		try {
			const baseURL = 'https://ta-da.world/api';
			const response = await fetch(`${baseURL}/hosts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					hostId: id,
					type: type
				})
			});
			if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`);
			const json = await response.json() as LoginData;
			console.log('LOGIN DATA: ', json);
			setData(json);
			const { accessToken, refreshToken } = json;
			setCookie('accessToken', accessToken, { path: '/' });
			dispatch(login(refreshToken));
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unknown error occurred');
			}
		}
	};

	return { data, error, handleLogin };
};

export default useLogin;
