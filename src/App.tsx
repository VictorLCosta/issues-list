import { useRef, useState } from 'react';
import issues from './data/issues.json';
import type { ChangeEvent, MutableRefObject} from 'react';
import './App.css';

function App() {
	const [checkedIssues, setCheckedIssues] = useState(new Set<string>());

	const topCheckboxRef = useRef() as MutableRefObject<HTMLInputElement>;

	const handleOnChange = (id: string) => {
		const tempIssuesList = new Set(checkedIssues);

		if (tempIssuesList.has(id)) {
			tempIssuesList.delete(id);
		} else {
			tempIssuesList.add(id);
		}

		setCheckedIssues(tempIssuesList);

		topCheckboxRef.current.indeterminate =
			tempIssuesList.size > 0 && tempIssuesList.size < issues.length;

		topCheckboxRef.current.checked = tempIssuesList.size === issues.length;
	};

	const handleSelectDeselectAll = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setCheckedIssues(new Set<string>(issues.map(({ id }) => id)));
		} else {
			setCheckedIssues(new Set<string>());
		}
	};

	return (
		<table>
			<thead>
				<tr>
					<th>
						<input
							type="checkbox"
							ref={topCheckboxRef}
							onChange={(e) => handleSelectDeselectAll(e)}
						/>
					</th>
					<th>
						{checkedIssues.size === 0
							? 'None selected'
							: `Selected ${checkedIssues.size}`}
					</th>
				</tr>
				<tr>
					<th />
					<th>Name</th>
					<th>Message</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{issues.map(({ id, name, message, status }, i) => {
					const isIssueOpen = status === 'open';

					return (
						<tr
							key={i}
							onClick={() => handleOnChange(id)}
							style={{
								backgroundColor: checkedIssues.has(
									id
								)
									? '#eee'
									: '#fff',
							}}
						>
							<td>
								<input
									type="checkbox"
									checked={checkedIssues.has(
										id
									)}
									onChange={() =>
										handleOnChange(id)
									}
								/>
							</td>
							<td>{name}</td>
							<td>{message}</td>
							<td>
								<span
									className={
										isIssueOpen
											? 'red-circle'
											: 'green-circle'
									}
								/>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default App;
