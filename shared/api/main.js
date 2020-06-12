import { api } from './index';
import { getInfoFromIndex } from '../helpers/stock';

export const fetchInfo = async () => {
	try {
		const { data } = await api.get(`Loader.aspx?ParTree=15`);

		const textFilter = getInfoFromIndex(data);

		return textFilter;
	} catch (e) {
		throw e;
	}
};
