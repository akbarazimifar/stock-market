let lastResult = null;
export const getInfoFromIndex = data => {
	const text = data.replace(/(\r\n|\n|\r)/gm, '').replace(/ {1,}/g, ' ');

	const regex = /<div class="header">بازار نقدی بورس در یک نگاه<\/div> <div class="content"> <table class="table1"> <tbody> <tr> <td>وضعیت بازار<\/td> <td>(.*?)&nbsp;.*?<td>شاخص کل<\/td> <td>(.*?) <div.*?>(.*?)<\/div>.*?>شاخص كل \(هم وزن\)<\/td> <td>(.*?)<.*?>(.*?)<.*?>ارزش بازار<\/td> <td><div class='ltr' title="(.*?)">(.*?)<.*?<td>اطلاعات قیمت<\/td> <td>(.*?)<.*?<td>تعداد معاملات<\/td> <td><div class='ltr' title="(.*?)">(.*?)<.*?<td>ارزش معاملات<\/td> <td><div class='ltr' title="(.*?)">(.*?)<.*?<td>حجم معاملات<\/td> <td><div class='ltr' title="(.*?)">(.*?)</gim;

	let result = null;
	const match = regex.exec(text);

	if (match) {
		result = {};

		let totalIndexLabel = '';
		if (lastResult) {
			if (match[3] > lastResult.exchange.totalIndex.subValue)
				totalIndexLabel = 'up';
			else if (match[3] < lastResult.exchange.totalIndex.subValue)
				totalIndexLabel = 'down';
		}

		let totalIndexEqualWeightLabel = '';
		if (lastResult) {
			if (match[3] > lastResult.exchange.totalIndexEqualWeight.subValue)
				totalIndexEqualWeightLabel = 'up';
			else if (match[3] < lastResult.exchange.totalIndexEqualWeight.subValue)
				totalIndexEqualWeightLabel = 'down';
		}

		result.exchange = {
			title: 'بازار نقدی بورس',
			time: new Date(),
			openStatus: {
				title: 'وضعیت بازار',
				label: match[1],
				value: match[1] !== 'بسته',
			},
			totalIndex: {
				title: 'شاخص کل',
				value: match[2],
				subValue: match[3],
				label: totalIndexLabel,
			},
			totalIndexEqualWeight: {
				title: 'شاخص كل (هم وزن)',
				value: match[4],
				subValue: match[5],
				label: totalIndexEqualWeightLabel,
			},
			marketValue: {
				title: 'ارزش بازار',
				value: match[7],
				subValue: match[6],
			},
			priceInfoTime: {
				title: 'اطلاعات قیمت',
				value: match[8],
			},
			numberTransactions: {
				title: 'تعداد معاملات',
				value: match[10],
				subValue: match[9],
			},
			transactionValue: {
				title: 'ارزش معاملات',
				value: match[12],
				subValue: match[11],
			},
			tradingVolume: {
				title: 'حجم معاملات',
				value: match[14],
				subValue: match[13],
			},
		};

		result.otc = {
			title: 'فرابورس',
		};
	}

	lastResult = { ...result };
	return result;
};
