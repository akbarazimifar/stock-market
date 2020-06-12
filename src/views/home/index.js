import React, { useEffect, useState } from 'react';
import {
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CProgress,
	CRow,
	CTooltip,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { fetchInfo } from '@api/main';

const Dashboard = () => {
	const [infoData, setInfoData] = useState(null);

	useEffect(() => {
		getInfo();
	}, []);

	const getInfo = () => {
		fetchInfo().then(data => {
			setInfoData(data);

			setTimeout(() => {
				getInfo();
			}, 3000);
		});
	};

	return (
		<>
			{infoData && (
				<>
					<CCard>
						<CCardHeader>
							<h3>بازار نقدی بورس</h3>
						</CCardHeader>
						<CCardBody className='fs-15'>
							<CRow className='text-center mb-2'>
								<CCol md sm='12' className='mb-sm-2 mb-0'>
									<div className='text-muted mb-3'>
										{infoData.exchange.openStatus.title}
									</div>
									<div className='mb-1'>
										<strong>{infoData.exchange.openStatus.label}</strong>
									</div>
									<CProgress
										className='progress-xs mt-2'
										precision={1}
										color='success'
										value={infoData.exchange.openStatus.status ? 100 : 0}
									/>
								</CCol>

								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.exchange.totalIndex.title}
									</div>
									<div className='mb-1'>
										<strong>{infoData.exchange.totalIndex.value}</strong>
									</div>
									<div>
										<span
											className={`fix-number ${
												infoData.exchange.totalIndex.subValue > 0
													? `text-success`
													: infoData.exchange.totalIndex.subValue < 0
													? 'text-danger'
													: ''
											}`}
										>
											{infoData.exchange.totalIndex.subValue}
										</span>
										<i
											className={`fas fa-caret-${
												infoData.exchange.totalIndex.label === 'up'
													? `up text-success`
													: infoData.exchange.totalIndex.label === 'down'
													? 'down text-danger'
													: ''
											} mr-2 caret-up-down-icon`}
										/>
									</div>
								</CCol>

								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.exchange.totalIndexEqualWeight.title}
									</div>
									<div className='mb-1'>
										<strong>
											{infoData.exchange.totalIndexEqualWeight.value}
										</strong>
									</div>
									<div>
										<span
											className={`fix-number ${
												infoData.exchange.totalIndexEqualWeight.subValue > 0
													? `text-success`
													: infoData.exchange.totalIndexEqualWeight.subValue < 0
													? 'text-danger'
													: ''
											}`}
										>
											{infoData.exchange.totalIndexEqualWeight.subValue}
										</span>
										<i
											className={`fas fa-caret-${
												infoData.exchange.totalIndexEqualWeight.label === 'up'
													? `up text-success`
													: infoData.exchange.totalIndexEqualWeight.label ===
													  'down'
													? 'down text-danger'
													: ''
											} mr-2 caret-up-down-icon`}
										/>
									</div>
								</CCol>

								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.exchange.priceInfoTime.title}
									</div>
									<div className='mb-1 fix-number'>
										<strong>{infoData.exchange.priceInfoTime.value}</strong>
									</div>
								</CCol>
							</CRow>

							<CRow className='text-center border-top pt-4'>
								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.exchange.marketValue.title}
									</div>
									<div className='mb-1 fix-number'>
										<CTooltip content={infoData.exchange.marketValue.subValue}>
											<strong className='tooltiper'>
												{infoData.exchange.marketValue.value}
											</strong>
										</CTooltip>
									</div>
								</CCol>

								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.exchange.numberTransactions.title}
									</div>
									<div className='mb-1 fix-number'>
										<CTooltip
											content={infoData.exchange.numberTransactions.subValue}
										>
											<strong className='tooltiper'>
												{infoData.exchange.numberTransactions.value}
											</strong>
										</CTooltip>
									</div>
								</CCol>

								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.exchange.transactionValue.title}
									</div>
									<div className='mb-1 fix-number'>
										<CTooltip
											content={infoData.exchange.transactionValue.subValue}
										>
											<strong className='tooltiper'>
												{infoData.exchange.transactionValue.value}
											</strong>
										</CTooltip>
									</div>
								</CCol>

								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.exchange.tradingVolume.title}
									</div>
									<div className='mb-1 fix-number'>
										<CTooltip
											content={infoData.exchange.tradingVolume.subValue}
										>
											<strong className='tooltiper'>
												{infoData.exchange.tradingVolume.value}
											</strong>
										</CTooltip>
									</div>
								</CCol>
							</CRow>
						</CCardBody>
					</CCard>

					<CCard>
						<CCardHeader>
							<h3>بازار نقدی فرابورس</h3>
						</CCardHeader>
						<CCardBody className='fs-15'>
							<CRow className='text-center mb-2'>
								<CCol md sm='12' className='mb-sm-2 mb-0'>
									<div className='text-muted mb-3'>
										{infoData.otc.openStatus.title}
									</div>
									<div className='mb-1'>
										<strong>{infoData.otc.openStatus.label}</strong>
									</div>
									<CProgress
										className='progress-xs mt-2'
										precision={1}
										color='success'
										value={infoData.otc.openStatus.status ? 100 : 0}
									/>
								</CCol>

								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.otc.totalIndex.title}
									</div>
									<div className='mb-1'>
										<strong>{infoData.otc.totalIndex.value}</strong>
									</div>
									<div>
										<span
											className={`fix-number ${
												infoData.otc.totalIndex.subValue > 0
													? `text-success`
													: infoData.otc.totalIndex.subValue < 0
													? 'text-danger'
													: ''
											}`}
										>
											{infoData.otc.totalIndex.subValue}
										</span>
										<i
											className={`fas fa-caret-${
												infoData.otc.totalIndex.label === 'up'
													? `up text-success`
													: infoData.otc.totalIndex.label === 'down'
													? 'down text-danger'
													: ''
											} mr-2 caret-up-down-icon`}
										/>
									</div>
								</CCol>

								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.otc.priceInfoTime.title}
									</div>
									<div className='mb-1 fix-number'>
										<strong>{infoData.otc.priceInfoTime.value}</strong>
									</div>
								</CCol>
							</CRow>

							<CRow className='text-center border-top pt-4'>
								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.otc.marketValue.title}
									</div>
									<div className='mb-1 fix-number'>
										<CTooltip content={infoData.otc.marketValue.subValue}>
											<strong className='tooltiper'>
												{infoData.otc.marketValue.value}
											</strong>
										</CTooltip>
									</div>
								</CCol>

								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.otc.numberTransactions.title}
									</div>
									<div className='mb-1 fix-number'>
										<CTooltip
											content={infoData.otc.numberTransactions.subValue}
										>
											<strong className='tooltiper'>
												{infoData.otc.numberTransactions.value}
											</strong>
										</CTooltip>
									</div>
								</CCol>

								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.otc.transactionValue.title}
									</div>
									<div className='mb-1 fix-number'>
										<CTooltip content={infoData.otc.transactionValue.subValue}>
											<strong className='tooltiper'>
												{infoData.otc.transactionValue.value}
											</strong>
										</CTooltip>
									</div>
								</CCol>

								<CCol md sm='12' className='mb-sm-2 mb-0 d-md-down-none'>
									<div className='text-muted mb-3'>
										{infoData.otc.tradingVolume.title}
									</div>
									<div className='mb-1 fix-number'>
										<CTooltip content={infoData.otc.tradingVolume.subValue}>
											<strong className='tooltiper'>
												{infoData.otc.tradingVolume.value}
											</strong>
										</CTooltip>
									</div>
								</CCol>
							</CRow>
						</CCardBody>
					</CCard>

					<CRow>
						<CCol md sm='12'>
							<CCard>
								<CCardHeader>
									<h3>تاثیر در شاخص بورس</h3>
								</CCardHeader>
								<CCardBody className='fs-15'>
									<table className='table table-hover table-outline mb-0 d-none d-sm-table'>
										<thead className='thead-light'>
											<tr>
												<th>نماد</th>
												<th>قیمت پایانی</th>
												<th>تاثیر</th>
											</tr>
										</thead>
										<tbody>
											{infoData.exchangeIndexer.list.map(item => (
												<tr key={item.insCode}>
													<td>
														<div>{item.title}</div>
														<div className='small text-muted'>
															{item.description}
														</div>
													</td>
													<td>
														<strong>{item.finalPrice}</strong>{' '}
														<span className='small text-muted'>ریال</span>
													</td>
													<td>
														<div className='clearfix'>
															<div className='float-left'>
																<strong>{item.influence}</strong>
															</div>
														</div>
														<CProgress
															className='progress-xs'
															color='primary'
															value={
																(item.influence /
																	infoData.exchangeIndexer.sumInfluence) *
																100
															}
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</CCardBody>
							</CCard>
						</CCol>
						<CCol md sm='12'>
							<CCard>
								<CCardHeader>
									<h3>تاثیر در شاخص فرابورس</h3>
								</CCardHeader>
								<CCardBody className='fs-15'>
									<table className='table table-hover table-outline mb-0 d-none d-sm-table'>
										<thead className='thead-light'>
											<tr>
												<th>نماد</th>
												<th>قیمت پایانی</th>
												<th>تاثیر</th>
											</tr>
										</thead>
										<tbody>
											{infoData.otcIndexer.list.map(item => (
												<tr key={item.insCode}>
													<td>
														<div>{item.title}</div>
														<div className='small text-muted'>
															{item.description}
														</div>
													</td>
													<td>
														<strong>{item.finalPrice}</strong>{' '}
														<span className='small text-muted'>ریال</span>
													</td>
													<td>
														<div className='clearfix'>
															<div className='float-left'>
																<strong>{item.influence}</strong>
															</div>
														</div>
														<CProgress
															className='progress-xs'
															color='primary'
															value={
																(item.influence /
																	infoData.otcIndexer.sumInfluence) *
																100
															}
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</CCardBody>
							</CCard>
						</CCol>
					</CRow>
				</>
			)}
		</>
	);
};

export default Dashboard;
