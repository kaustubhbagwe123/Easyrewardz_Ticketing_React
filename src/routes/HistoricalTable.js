import React from 'react';

function HistoricalTable(){
    return(
        <div className="table-scrolling">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                        <th>Time & Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Naman</td>
                        <td>Task Linked with Ticket</td>
                        <td>9/13/2019 12:00</td>
                    </tr>
                    <tr>
                        <td>Auto/System</td>
                        <td>Task Assigned to Store</td>
                        <td>9/14/2019 12:00</td>
                    </tr>
                    <tr>
                        <td>Mukesh</td>
                        <td>Comment Added</td>
                        <td>9/15/2019 12:00</td>
                    </tr>
                    <tr>
                        <td>Auto/System</td>
                        <td>Resolution Over Due</td>
                        <td>9/16/2019 12:00</td>
                    </tr>
                    <tr>
                        <td>Auto/System</td>
                        <td>Task Priority Changed </td>
                        <td>9/17/2019 12:00</td>
                    </tr>
                    <tr>
                        <td>Mukesh</td>
                        <td>Claim Raised</td>
                        <td>9/18/2019 12:00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default HistoricalTable;