import { arabicToPersian } from './index';

let lastResult = null;
export const getInfoFromIndex = data => {
	let text = data.substring(
		data.indexOf('بورس اوراق بهادار تهران'),
		data.length,
	);
	text = text.replace(/(\r\n|\n|\r)/gm, '').replace(/ {1,}/g, ' ');
	text = arabicToPersian(text);

	const result = {};

	const regexExchange = /<div class="header">بازار نقدی بورس در یک نگاه<\/div> <div class="content"> <table class="table1"> <tbody> <tr> <td>وضعیت بازار<\/td> <td>(.*?)&nbsp;<span class='RealServerTime'><!--RealServerTime--><\/span><\/td> <\/tr> <tr> <td>شاخص کل<\/td> <td>([\d.,]+) <div class='pn'>([\d.,]+)<\/div><\/td> <\/tr> <tr> <td>شاخص کل \(هم وزن\)<\/td> <td>([\d.,]+) <div class='pn'>([\d.,]+)<\/div><\/td> <\/tr> <tr> <td>ارزش بازار<\/td> <td>(.*?)([\d\w\s.,]+)[</div>]*<\/td> <\/tr> <tr> <td>اطلاعات قیمت<\/td> <td>([\d\s/:.,]+)<\/td> <\/tr> <tr> <td>تعداد معاملات<\/td> <td>(.*?)([\d\w\s.,]+)[</div>]*<\/td> <\/tr> <tr> <td>ارزش معاملات<\/td> <td>(.*?)([\d\w\s.,]+)[</div>]*<\/td> <\/tr> <tr> <td>حجم معاملات<\/td> <td>(.*?)([\d\w\s.,]+)[</div>]*<\/td>/gim;

	const matchExchange = regexExchange.exec(text);
	if (matchExchange) {
		let totalIndexLabel = '';
		if (lastResult) {
			if (matchExchange[3] > lastResult.exchange.totalIndex.subValue)
				totalIndexLabel = 'up';
			else if (matchExchange[3] < lastResult.exchange.totalIndex.subValue)
				totalIndexLabel = 'down';
		}

		let totalIndexEqualWeightLabel = '';
		if (lastResult) {
			if (matchExchange[5] > lastResult.exchange.totalIndexEqualWeight.subValue)
				totalIndexEqualWeightLabel = 'up';
			else if (
				matchExchange[5] < lastResult.exchange.totalIndexEqualWeight.subValue
			)
				totalIndexEqualWeightLabel = 'down';
		}

		result.exchange = {
			title: 'بازار نقدی بورس',
			openStatus: {
				title: 'وضعیت بازار',
				label: matchExchange[1],
				value: matchExchange[1] !== 'بسته',
			},
			totalIndex: {
				title: 'شاخص کل',
				value: matchExchange[2],
				subValue: matchExchange[3],
				label: totalIndexLabel,
			},
			totalIndexEqualWeight: {
				title: 'شاخص کل (هم وزن)',
				value: matchExchange[4],
				subValue: matchExchange[5],
				label: totalIndexEqualWeightLabel,
			},
			marketValue: {
				title: 'ارزش بازار',
				value: matchExchange[7],
				subValue: flatSubValue(matchExchange[6]) || matchExchange[7],
			},
			priceInfoTime: {
				title: 'اطلاعات قیمت',
				value: matchExchange[8],
			},
			numberTransactions: {
				title: 'تعداد معاملات',
				value: matchExchange[10],
				subValue: flatSubValue(matchExchange[9]) || matchExchange[10],
			},
			transactionValue: {
				title: 'ارزش معاملات',
				value: matchExchange[12],
				subValue: flatSubValue(matchExchange[11]) || matchExchange[12],
			},
			tradingVolume: {
				title: 'حجم معاملات',
				value: matchExchange[14],
				subValue: flatSubValue(matchExchange[13]) || matchExchange[14],
			},
		};
	}

	const regexOTC = /<div class="header">بازار نقدی فرابورس در یک نگاه<\/div> <div class="content"> <table class="table1"> <tbody> <tr> <td>وضعیت بازار<\/td> <td>(.*?)&nbsp;<span class='RealServerTime'><!--RealServerTime--><\/span><\/td> <\/tr> <tr> <td>شاخص کل<\/td> <td>([\d.,]+) <div class='pn'>([\d.,]+)<\/div><\/td> <\/tr> <tr> <td>ارزش بازار <span style='font-size: 10px'>اول و دوم<\/span><\/td> <td>(.*?)([\d\w\s.,]+)[</div>]*<\/td> <\/tr> <tr> <td>اطلاعات قیمت<\/td> <td>([\d\s/:.,]+)<\/td> <\/tr> <tr> <td>تعداد معاملات<\/td> <td>(.*?)([\d.,]+)[</div>]*<\/td> <\/tr> <tr> <td>ارزش معاملات<\/td> <td>(.*?)([\d\w\s.,]+)[</div>]*<\/td> <\/tr> <tr> <td>حجم معاملات<\/td> <td>(.*?)([\d\w\s.,]+)[</div>]*<\/td>/gim;

	const matchOTC = regexOTC.exec(text);
	if (matchOTC) {
		let totalIndexLabel = '';
		if (lastResult) {
			if (matchOTC[3] > lastResult.otc.totalIndex.subValue)
				totalIndexLabel = 'up';
			else if (matchOTC[3] < lastResult.otc.totalIndex.subValue)
				totalIndexLabel = 'down';
		}

		result.otc = {
			title: 'بازار نقدی فرابورس',
			openStatus: {
				title: 'وضعیت بازار',
				label: matchOTC[1],
				value: matchOTC[1] !== 'بسته',
			},
			totalIndex: {
				title: 'شاخص کل',
				value: matchOTC[2],
				subValue: matchOTC[3],
				label: totalIndexLabel,
			},
			marketValue: {
				title: 'ارزش بازار اول و دوم',
				value: matchOTC[5],
				subValue: flatSubValue(matchOTC[4]) || matchOTC[5],
			},
			priceInfoTime: {
				title: 'اطلاعات قیمت',
				value: matchOTC[6],
			},
			numberTransactions: {
				title: 'تعداد معاملات',
				value: matchOTC[8],
				subValue: flatSubValue(matchOTC[7]) || matchOTC[8],
			},
			transactionValue: {
				title: 'ارزش معاملات',
				value: matchOTC[10],
				subValue: flatSubValue(matchOTC[9]) || matchOTC[10],
			},
			tradingVolume: {
				title: 'حجم معاملات',
				value: matchOTC[12],
				subValue: flatSubValue(matchOTC[11]) || matchOTC[12],
			},
		};
	}

	const regexIndexer = number =>
		new RegExp(
			`'${number}InstAffect'\\)" class="header pointer">تاثیر در شاخص<\\/div> <div class="content"> <table class="table1"> <thead> <tr> <th>نماد<\\/th> <th>قیمت پایانی<\\/th> <th>تاثیر<\\/th> <\\/tr> <\\/thead> <tbody> <tr> <td><a target="_blank" href="Loader\\.aspx\\?ParTree=151311&i=(\\d+)" title="(.*?)">(.*?)<\\/a><\\/td> <td>([\\d.,]+)<\\/td> <td><div class='pn'>([\\d.,]+)<\\/div><\\/td> <\\/tr> <tr> <td><a target="_blank" href="Loader\\.aspx\\?ParTree=151311&i=(\\d+)" title="(.*?)">(.*?)<\\/a><\\/td> <td>([\\d.,]+)<\\/td> <td><div class='pn'>([\\d.,]+)<\\/div><\\/td> <\\/tr> <tr> <td><a target="_blank" href="Loader\\.aspx\\?ParTree=151311&i=(\\d+)" title="(.*?)">(.*?)<\\/a><\\/td> <td>([\\d.,]+)<\\/td> <td><div class='pn'>([\\d.,]+)<\\/div><\\/td> <\\/tr> <tr> <td><a target="_blank" href="Loader\\.aspx\\?ParTree=151311&i=(\\d+)" title="(.*?)">(.*?)<\\/a><\\/td> <td>([\\d.,]+)<\\/td> <td><div class='pn'>([\\d.,]+)<\\/div><\\/td> <\\/tr> <tr> <td><a target="_blank" href="Loader\\.aspx\\?ParTree=151311&i=(\\d+)" title="(.*?)">(.*?)<\\/a><\\/td> <td>([\\d.,]+)<\\/td> <td><div class='pn'>([\\d.,]+)<\\/div><\\/td> <\\/tr> <tr> <td><a target="_blank" href="Loader\\.aspx\\?ParTree=151311&i=(\\d+)" title="(.*?)">(.*?)<\\/a><\\/td> <td>([\\d.,]+)<\\/td> <td><div class='pn'>([\\d.,]+)<\\/div><\\/td> <\\/tr> <tr> <td><a target="_blank" href="Loader\\.aspx\\?ParTree=151311&i=(\\d+)" title="(.*?)">(.*?)<\\/a><\\/td> <td>([\\d.,]+)<\\/td> <td><div class='pn'>([\\d.,]+)<\\/div><\\/td> <\\/tr>`,
			'gim',
		);

	for (let inx = 1; inx <= 2; inx++) {
		const list = [];
		let sumInfluence = 0;

		const matchIndexer = regexIndexer(inx).exec(text);
		if (matchIndexer) {
			for (let attr = 1; attr <= 35; attr += 5) {
				list.push({
					insCode: matchIndexer[attr],
					description: matchIndexer[attr + 1],
					title: matchIndexer[attr + 2],
					finalPrice: matchIndexer[attr + 3],
					influence: parseFloat(matchIndexer[attr + 4]),
				});
				sumInfluence += parseFloat(matchIndexer[attr + 4]);
			}
		}

		if (inx === 1) result.exchangeIndexer = { sumInfluence, list };
		else result.otcIndexer = { sumInfluence, list };
	}

	if (Object.keys(result).length > 0) {
		lastResult = { ...result };
		return result;
	}

	lastResult = null;
	return null;
};

const flatSubValue = text => {
	if (!text) return null;
	return text.replace("<div class='ltr' title=\"", '').replace('">', '');
};
