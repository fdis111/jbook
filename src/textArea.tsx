interface Props {
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	value: string | number | readonly string[] | undefined;
}

const TextArea: React.FC<Props> = ({ onChange, value }) => {
	return (
		<textarea
			value={value}
			onChange={onChange}
			name='Text area'
			id='Text area'
			cols={30}
			rows={10}
		></textarea>
	);
};

export default TextArea;
