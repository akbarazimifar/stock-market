import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHeader, CToggler, CSpinner, CBadge } from '@coreui/react';
import { setShowSidebar } from '@services/app/actions';
import moment from 'moment-jalaali';

moment.loadPersian();

const TheHeader = () => {
	const dispatch = useDispatch();

	const sidebarShow = useSelector(state => state.app.sidebarShow);
	const inRetry = useSelector(state => state.app.inRetry);
	const retryText = useSelector(state => state.app.retryText);
	const receiveDataTime = useSelector(state => state.app.receiveDataTime);

	const toggleSidebar = () => {
		const val = [true, 'responsive'].includes(sidebarShow)
			? false
			: 'responsive';
		dispatch(setShowSidebar(val));
	};

	const toggleSidebarMobile = () => {
		const val = [false, 'responsive'].includes(sidebarShow)
			? true
			: 'responsive';
		dispatch(setShowSidebar(val));
	};

	return (
		<CHeader>
			<CToggler
				inHeader
				className='ml-md-3 d-lg-none'
				onClick={toggleSidebarMobile}
			/>
			<CToggler
				inHeader
				className='ml-3 d-md-down-none'
				onClick={toggleSidebar}
			/>

			<div className='px-3 justify-content-between header-wrapper'>
				<div className='border-0 m-0 px-0 px-md-3'>
					{inRetry && <CSpinner color='danger' size='sm' />}{' '}
					<span className='text-danger mr-2'>{retryText}</span>
				</div>

				<div className='d-md-down-none mfe-2'>
					{receiveDataTime && (
						<>
							آخرین زمان دریافت اطلاعات:{' '}
							<strong className='fix-number'>
								<span className='rtl-text mr-2'>
									{moment(receiveDataTime).format('jD jMMMM jYYYY')}
								</span>
								<CBadge
									color='primary'
									shape='pill'
									className='last-fetch-data-time'
								>
									{moment(receiveDataTime).format('HH:mm:ss')}
								</CBadge>
							</strong>
						</>
					)}
				</div>
			</div>
		</CHeader>
	);
};

export default TheHeader;
