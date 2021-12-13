import { NextPage } from "next";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Chart } from 'react-google-charts'

const Today: NextPage = () => {
	const [today, setToday] = useState<any>();
	const [totalTime, setTotalTime] = useState<string>();

	function secondsToReadable(seconds: number) {
		let secs = seconds * 3600;
		let hrs;
		let mins;
		hrs = Math.floor(secs / 3600);
		mins = Math.floor((secs - hrs * 3600) / 60);
		return `${hrs}hrs ${mins}min`
	}


	useEffect(() => {
		let token = localStorage.getItem('token')
		fetch('/api/today', {
			method: 'GET',
			headers: { 'token': token! }
		}).then((res) => res.json())
			.then((data) => {
				let items: any = [];
				data.projects.forEach((item: any) => {
					let x = [];
					x.push(item.project);
					x.push(secondsToReadable(item.duration));
					let hrs =(item.duration / 3600);
					items.push([item.project, hrs, randomColor()]);
				})
				console.log(items)
				setToday(items);

			})
	}, []);
	console.log(today);

	useEffect(() => {
		if (today && today?.grand_total) {
			let hrs = Math.floor(today?.grand_total.total_seconds / 3600);
			let mins = Math.floor((today?.grand_total.total_seconds - hrs * 3600) / 60);
			setTotalTime(`${hrs}hrs ${mins}min`)
		}
	}, [today])

	const randomColor = () => {
		return `rgba(${Math.floor(Math.random() * 252)}, ${Math.floor(Math.random() * 252)}, ${Math.floor(Math.random() * 252)}, 0.8)`
	}

	return (
		<div>
			<Header />
			<div className="flex">
				<Sidebar />
				<div className="w-full h-full flex flex-col items-start p-10">
					<h1 className="text-primary text-2xl font-semibold">{totalTime}</h1>
					<div className="w-full h-full">
						{today &&
							<Chart
								width={'100%'}
								height={'100%'}
								chartType="BarChart"
								loader={<div>Loading Chart</div>}
								data={[
									['name', 'duration', { role: 'style' }],
									...today
								]}
								options={{
									title: 'All projects you worked on today',
									// chartArea: { width: '50%' },
									hAxis: {
										title: 'time',
										minValue: 0,
									},

								}}
								// For tests
								rootProps={{ 'data-testid': '1' }}
							/>
						}
					</div>
				</div>

			</div>
		</div >
	)
}


export default Today