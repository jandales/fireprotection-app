import Alert from '@/Components/Alert'
import {   
    CRow,
    CCard,
    CCardHeader,
    CCol,  
  } from '@coreui/react'

const RecentAlerts = ({alerts, id, handleAlertClick}) => {  
    console.log(alerts)
    return (
        <CCard className="mb-4">
                    <CCardHeader>
                        <CRow>
                            <CCol md={11}>
                              <div className='device-header'>
                                    Recent Alert
                              </div>
                            </CCol>                            
                        </CRow>                      
                    </CCardHeader>  
                      {alerts?.data.map((notification, index) => (
                          <Alert 
                            key={index} 
                            alert={notification}
                            active={notification.id == id}                           
                            onAlertClick={handleAlertClick}                                            
                          />
                      ))}           
              </CCard>
    );
};

export default RecentAlerts;
