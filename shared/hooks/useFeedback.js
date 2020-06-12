import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { submitFeedback, fetchFeedback } from '../api/feedback';
import { setFeedbackRefresh } from '../services/feedback/actions';

const initialValues = {
	feedbackComment: '',
	feedbackItemViewModels: null,
};

const useFeedback = invoiceId => {
	const dispatch = useDispatch();

	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState(initialValues);
	const [submitting, setSubmitting] = useState(false);
	const [hasRate, setHasRate] = useState(true);

	useEffect(() => {
		getItem();
	}, []);

	const getItem = useCallback(async () => {
		try {
			const result = await fetchFeedback(invoiceId);
			const items = result.feedbackItemViewModels;

			setValues(val => ({
				...val,
				feedbackItemViewModels: items.map(item => ({
					invoiceItemId: item.invoiceItemId,
					foodItemName: item.foodItemName,
					invoiceItemPrice: item.invoiceItemPrice,
					feedbackItemRate: item.feedbackItemRate,
				})),
				feedbackComment: result.feedbackComment,
			}));

			const findOneItemIsNull = items.find(
				item => item.feedbackItemRate === null,
			);
			if (findOneItemIsNull) setHasRate(false);
		} catch (e) {
			// console.log(e);
		}
	}, []);

	const onChangeComment = useCallback(value => {
		if (value === '') {
			setErrors(err => ({
				...err,
				feedbackComment: '',
			}));
		}

		setValues(val => ({ ...val, feedbackComment: value }));
	}, []);

	const onSubmit = useCallback(async () => {
		const findOneItemIsNull = values.feedbackItemViewModels.find(
			item => item.feedbackItemRate === null,
		);
		if (findOneItemIsNull) {
			return {
				success: false,
				message: 'لطفاً نظر خود را در مورد تمامی موارد ثبت کنید',
			};
		}

		setSubmitting(true);

		try {
			await submitFeedback({ ...values, invoiceId });
			dispatch(setFeedbackRefresh());

			setSubmitting(false);
			setErrors(initialValues);
			setHasRate(true);
			return {
				success: true,
				message: 'نظر شما با موفقیت ثبت شد',
			};
		} catch (error) {
			setSubmitting(false);
			setErrors(initialValues);
			return {
				success: false,
				message: 'خطایی رخ داده است، دوباره تلاش کنید',
			};
		}
	}, [values, invoiceId]);

	const onSelectRate = useCallback(
		(itemId, value) => {
			if (!hasRate) {
				const newItems = [];
				values.feedbackItemViewModels.forEach(item => {
					if (item.invoiceItemId === itemId) {
						newItems.push({ ...item, feedbackItemRate: value });
					} else {
						newItems.push(item);
					}
				});

				setValues(val => ({
					...val,
					feedbackItemViewModels: newItems,
				}));
			}
		},
		[values, hasRate],
	);

	return {
		submitting,
		values,
		errors,
		onChangeComment,
		onSelectRate,
		onSubmit,
		hasRate,
	};
};

export default useFeedback;
