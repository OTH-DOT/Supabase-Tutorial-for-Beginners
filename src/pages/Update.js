import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import supabase from "../config/SupabaseClient"

const Update = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  useEffect(()=>{
    const fetchSmoothie = async () => {
      const {data, error} = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()

        if(error) {
          navigate('/', {replace:true})
        }

        if(data) {
          setTitle(data.title)
          setMethod(data.method)
          setRating(data.rating)
          console.log(data)
        }
    }

    fetchSmoothie()
  },[id, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!title || !method || !rating) {
      setFormError('please fill in all fields correctly')
      return
    }


    const {data, error} = await supabase
      .from('smoothies')
      .update([{title, method, rating}])
      .eq('id', id)

    if(error) {
      console.log(error)
    }
    if(data) {
      console.log(data);
    } 

    if(!formError && !error) {
      navigate('/')
    }

    setFormError(null)
  }


  return (
    <div className="page update">
      <h2>Update - {id}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update