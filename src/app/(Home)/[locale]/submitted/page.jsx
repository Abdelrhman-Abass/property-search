// "use server";
// import Header from "@/layout/Header";
// import WhatsAppButton from "@/components/common/WhatsAppButton";

// const Page = async () => {
//   return (
//     <>
//       <div className="bgc-f7 pt0-md pt70 pb-0 text-center " style={{ minHeight: '50vh' }}>
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-8">
//               <div className="alert alert-success p-4 mt-5"  role="alert" style={{display:"flex" , color: '#fff', borderRadius: '10px' }}>
//                 <div className="mt-3">
//                   <span className="text-warning" style={{ fontSize: '2rem' }}>✔</span>
//                 </div>
//                 <div style={{ backgroundColor: 'rgb(15, 41, 80)' }}>
//                   <h4 className="mb-3">شكراً على تواصلكم مع قسم المبيعات</h4>
//                   <p>لقد تم استلام استفسارك لدينا، سيتم التواصل معك خلال الدقائق القادمة.</p>

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <WhatsAppButton data={"property search"} url={`companies`} />
//       </div>
//     </>
//   );
// };

// export default Page;

"use server";
import Header from "@/layout/Header";
import WhatsAppButton from "@/components/common/WhatsAppButton";

const Page = async () => {
  return (
    <>
      <div className="bgc-f7 pt0-md pt70 pb-0  min-vh-50">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-center justify-content-between p-4 mt-5" style={{ backgroundColor: '#002147', color: '#fff', borderRadius: '10px' }}>
                <div className=" d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px',color: '#fff', borderRadius: '10px' }}>
                  <span className="text-white" style={{ fontSize: '2rem' }}>✔</span>
                </div>
                <p className="mb-0" style={{width:"70%", flexGrow: 1,fontSize: '21px' ,color: '#fff' }}>
                  شكراً على تواصلكم مع قسم المبيعات.<br />
                  لقد تم استلام استفسارك لدينا، سيتم التواصل معك خلال الدقائق القادمة.
                </p>
              </div>
            </div>
          </div>
        </div>
        <WhatsAppButton data={"property search"} url={`companies`} />
      </div>
    </>
  );
};

export default Page;