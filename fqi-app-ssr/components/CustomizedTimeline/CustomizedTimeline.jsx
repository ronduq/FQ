const CustomizedTimeline = ({offset, viewBox}) => (
  <svg x={viewBox.x - (offset + 3)} y={offset - 3} width="18" height={viewBox.height} viewBox="0 0 18 605" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'grabbing'}}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(1, 1)" stroke="#006F60" strokeWidth="2">
        <g>
          <path d="M8,601.987194 L8,1.13341357" />
          <circle fill="#02917F" cx="7.55072441" cy="6" r="6" />
          <circle fill="#02917F" cx="8" cy="596.408577" r="6" />
          <g transform="translate(0.000000, 253.469370)" fill="#02917F">
            <rect x="0" y="0" width="16" height="67.8930825" rx="5" />
          </g>
        </g>
        <g transform="translate(4.000000, 290.475649)" >
          <path transform="rotate(270)" d="M0.533333333,0.578648325 L7.96666667,0.578648325" />
          <path transform="rotate(270)" d="M0.533333333,7.52242823 L7.96666667,7.52242823" />
          <path transform="rotate(270)" d="M0.533333333,3.8662081 L7.96666667,3.8662081"/>
        </g>
      </g>
    </g>
  </svg>
);

export default CustomizedTimeline;
