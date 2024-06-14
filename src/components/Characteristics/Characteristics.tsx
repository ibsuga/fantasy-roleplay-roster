import './Characteristics.css';


const Characteristics = () => {
    return (
        <div className="Characteristics">
            <div className='table-title'> CHARACTERISTICS</div>
            <table className="characteristics-table">
                <tr>
                    <th></th>
                    <th>WS</th>
                    <th>BS</th>
                    <th>S</th>
                    <th>T</th>
                    <th>I</th>
                    <th>Ag</th>
                    <th>Dex</th>
                    <th>Int</th>
                    <th>WP</th>
                    <th>Fel</th>
                </tr>
                <tr>
                    <td>Initial</td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                </tr>
                <tr>
                    <td>Advances</td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                </tr>
                <tr>
                    <td>Current</td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                    <td><input type="text" maxLength={3} /></td>
                </tr>
            </table>

        </div>
    )
}

export default Characteristics;