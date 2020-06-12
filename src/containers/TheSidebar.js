import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	CCreateElement,
	CSidebar,
	CSidebarBrand,
	CSidebarNav,
	CSidebarNavDivider,
	CSidebarNavTitle,
	CSidebarMinimizer,
	CSidebarNavDropdown,
	CSidebarNavItem,
} from '@coreui/react';

import { setShowSidebar } from '@services/app/actions';

// sidebar nav config
import navigation from './_nav';

const TheSidebar = () => {
	const dispatch = useDispatch();
	const show = useSelector(state => state.sidebarShow);

	return (
		<CSidebar show={show} onShowChange={val => dispatch(setShowSidebar(val))}>
			<CSidebarBrand className='d-md-down-none' to='/'>
				Stock Market
			</CSidebarBrand>
			<CSidebarNav>
				<CCreateElement
					items={navigation}
					components={{
						CSidebarNavDivider,
						CSidebarNavDropdown,
						CSidebarNavItem,
						CSidebarNavTitle,
					}}
				/>
			</CSidebarNav>
			<CSidebarMinimizer className='c-d-md-down-none' />
		</CSidebar>
	);
};

export default React.memo(TheSidebar);
