
const TransactionComponent = () => {
  return (
    <div className='flex justify-center h-screen'>
      <div className="flex flex-col items-center space-y-5 mt-20">
        <span>
          <label className="text-gray-300 font-medium mb-2">Address</label><br />
          <input type="text" placeholder='address' className='py-2 px-9 rounded-md bg-gray-300 shadow'/>
        </span>
        <span>
          <label className="text-gray-300 font-medium mb-2">Amount</label><br />
          <input type="text" placeholder='amount' className='py-2 px-9 rounded-md bg-gray-300 shadow'/>
        </span>
        <div className='mt-2'>
            <button className="bg-white text-black py-2 px-4 rounded-lg font-semibold hover:bg-gray-500">
              Submit
            </button>
        </div>

      </div>
    </div>
  )
}

export default TransactionComponent