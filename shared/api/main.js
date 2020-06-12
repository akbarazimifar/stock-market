import { retryApi } from './index';
import { getInfoFromIndex } from '../helpers/stock';

import store from '../services/store';
import { setInRetry, setReceiveDataTime } from '../services/app/actions';

export const fetchInfo = async () => {
	try {
		const { data } = await retryApi.get(`Loader.aspx?ParTree=15`);

		const textFilter = getInfoFromIndex(data);

		if (!textFilter) {
			store.dispatch(
				setInRetry(
					false,
					'پس از چندین بار تلاش، اطلاعات از سایت tsetmc دریافت نشد',
				),
			);
			throw new Error('اطلاعاتی پیدا نشد');
		}

		store.dispatch(setReceiveDataTime(new Date()));

		return textFilter;
	} catch (e) {
		throw e;
	}
};
