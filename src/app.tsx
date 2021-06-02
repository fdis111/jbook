import * as esbuild from 'esbuild-wasm';
import { useState, useEffect } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import TextArea from './textArea';

const App: React.FC = () => {
	const [textAreaValue, setTextAreaValue] = useState('');
	const [code, setCode] = useState('');
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextAreaValue(e.target.value);
	};
	const onSubmit = async () => {
		const result = await esbuild.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin()],
		});
		setCode(result.outputFiles[0].text);
	};
	const startService = async () => {
		await esbuild.initialize({
			worker: true,
			wasmURL: '/esbuild.wasm',
		});
	};

	useEffect(() => {
		startService();
	}, []);

	return (
		<>
			<div>
				<TextArea value={textAreaValue} onChange={onChange} />
			</div>
			<div>
				<button onClick={onSubmit}>Submit</button>
			</div>
			<div>
				<pre>{code}</pre>
			</div>
		</>
	);
};
export default App;
