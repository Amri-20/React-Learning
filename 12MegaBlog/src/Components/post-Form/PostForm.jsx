// import React, { useCallback, useEffect } from 'react'
// import { useForm, Watch } from 'react-hook-form'
// import { Button, Input, Select, RTE } from '../index'
// import service from '../../appwrite/config'
// import { data, useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'


// function PostForm({ post }) {
//   const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//     defaultValues: {
//       title: post?.title || '',
//       slug: post?.slug || '',
//       content: post?.content || '',
//       status: post?.staus || 'active',
//     },
//   })
//   const navigate = useNavigate()
//   const userData = useSelector((state) => state.auth.userData)


//   // const submit = async (data) => {
//   //   if (post) {
//   //     data.image[0] ? service.uploadFile(data.image[0]) : null
//   //     if (file) {
//   //       service.deleteFile(post.image)
//   //     }
//   //     const dbPost = await service.updatePost(
//   //       post.$id,
//   //       {
//   //         ...data,
//   //         i, age: file ? file.$id : undefined
//   //       })
//   //     if (dbPost) {
//   //       navigate(`/pst/${dbPost.$id}`)
//   //     }
//   //   } else {
//   //     const file = await service.uploadFile(data.image[0]);

//   //     if (file) {
//   //       const fileId = file.$id
//   //       data.image = fileId
//   //       const dbPost = await service.createPost({
//   //         ...data,
//   //         userId: userData.$id,
//   //       })
//   //       if (dbPost) {

//   //         navigate(`/post/${dbPost.$id}`)
//   //       }
//   //     }
//   //   }
//   // }

//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === 'string') {
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/^[a-zA-Z\d\s]+/g, '-')
//         .replace(/\s/g, '-')
//     }
//     return ''
//   }, [])

//   useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === 'title') {
//         setValue('slug', slugTransform(value.title, { shouldValiidate: true }))
//       }
//     })
//     return () => {
//       subscription.unsubscribe()
//     }
//   }, [watch, slugTransform, setValue])
//   const submit = async (data) => {
//     console.log("SUBMIT CLICKED", data)

//     // rest of your code
//   }

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//       <div className="w-2/3 px-2">
//         <Input
//           label="Title :"
//           placeholder="Title"
//           className="mb-4"
//           {...register("title", { required: true })}
//         />
//         <Input
//           label="Slug :"
//           placeholder="Slug"
//           className="mb-4"
//           {...register("slug", { required: true })}
//           onInput={(e) => {
//             setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//           }}
//         />
//         <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
//       </div>
//       <div className="w-1/3 px-2">
//         <Input
//           label="Featured Image :"
//           type="file"
//           className="mb-4"
//           accept="image/png, image/jpg, image/jpeg, image/gif"
//           {...register("image", { required: !post })}
//         />
//         {post && (
//           <div className="w-full mb-4">
//             <img
//               src={appwriteService.getFilePreview(post.featuredImage)}
//               alt={post.title}
//               className="rounded-lg"
//             />
//           </div>
//         )}
//         <Select
//           options={["active", "inactive"]}
//           label="Status"
//           className="mb-4"
//           {...register("status", { required: true })}
//         />
//         <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//           {post ? "Update" : "Submit"}
//         </Button>
//       </div>
//     </form>
//   )
// }

// export default PostForm

import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  })

  const navigate = useNavigate()

  const userData = useSelector(
    (state) => state.auth.userData
  )


  // =========================
  // SUBMIT FUNCTION
  // =========================

  const submit = async (data) => {

    console.log("=================================")
    console.log("🚀 SUBMIT STARTED")
    console.log("=================================")

    console.log("📦 FORM DATA:", data)
    console.log("👤 USER DATA:", userData)
    console.log("🖼️ SELECTED IMAGE:", data.image)


    // =========================
    // UPDATE POST
    // =========================

    if (post) {

      console.log("✏️ UPDATE MODE")

      let imageId = post.image

      console.log("🖼️ OLD IMAGE ID:", imageId)


      // If user selected a new image
      if (data.image && data.image[0]) {

        console.log("⬆️ NEW IMAGE DETECTED")
        console.log("📤 STARTING IMAGE UPLOAD...")

        const uploadedFile = await service.uploadFile(
          data.image[0]
        )

        console.log("📦 UPLOAD RESPONSE:", uploadedFile)


        if (uploadedFile) {

          console.log("✅ IMAGE UPLOADED SUCCESSFULLY")
          console.log("🆔 NEW FILE ID:", uploadedFile.$id)

          imageId = uploadedFile.$id


          // Delete old image
          if (post.image) {

            console.log("🗑️ DELETING OLD IMAGE...")

            const deleted =
              await service.deleteFile(post.image)

            console.log(
              "🗑️ OLD IMAGE DELETE RESPONSE:",
              deleted
            )
          }

        } else {

          console.log("❌ IMAGE UPLOAD FAILED")

          return
        }
      }


      console.log("📤 UPDATING DATABASE POST...")

      const dbPost = await service.updatePost(
        post.$id,
        {
          title: data.title,
          content: data.content,
          featuredImage: imageId,
          status: data.status,
          userId: post.userId || post.userid
        }
      )


      console.log("📦 DATABASE UPDATE RESPONSE:", dbPost)


      if (dbPost) {

        console.log("✅ POST UPDATED SUCCESSFULLY")
        console.log("🆔 POST ID:", dbPost.$id)

        navigate(`/post/${dbPost.$id}`)

      } else {

        console.log("❌ POST UPDATE FAILED")
      }

      return
    }


    // =========================
    // CREATE NEW POST
    // =========================

    console.log("🆕 CREATE POST MODE")


    // Check image
    if (!data.image || !data.image[0]) {

      console.log("❌ NO IMAGE SELECTED")

      return
    }


    console.log("📤 STARTING FILE UPLOAD...")
    console.log("📁 FILE:", data.image[0])


    const file = await service.uploadFile(
      data.image[0]
    )


    console.log("📦 UPLOAD RESPONSE:", file)


    if (!file) {

      console.log("❌ FILE UPLOAD FAILED")

      return
    }


    console.log("=================================")
    console.log("✅ FILE UPLOAD SUCCESSFUL")
    console.log("🆔 FILE ID:", file.$id)
    console.log("=================================")


    console.log("📤 STARTING DATABASE POST CREATION...")


    const dbPost = await service.createPost({

      title: data.title,

      slug: data.slug,

      content: data.content,

      // Appwrite column: image
      // image: file.$id,
      featuredImage: file.$id,

      status: data.status,

      // Appwrite column: userid
      // userid: userData?.$id
      userId: userData?.$id
    })


    console.log("📦 DATABASE RESPONSE:", dbPost)


    if (dbPost) {

      console.log("=================================")
      console.log("🎉 POST CREATED SUCCESSFULLY")
      console.log("🆔 POST ID:", dbPost.$id)
      console.log("=================================")


      navigate(`/post/${dbPost.$id}`)

    } else {

      console.log("=================================")
      console.log("❌ POST CREATION FAILED")
      console.log("=================================")

      // Delete uploaded file if database creation failed
      console.log("🗑️ CLEANING UP UPLOADED FILE...")

      await service.deleteFile(file.$id)
    }
  }


  // =========================
  // SLUG TRANSFORM
  // =========================

  const slugTransform = useCallback((value) => {

    if (value && typeof value === 'string') {

      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
    }

    return ''

  }, [])


  // =========================
  // AUTO GENERATE SLUG
  // =========================

  useEffect(() => {

    const subscription = watch((value, { name }) => {

      if (name === 'title') {

        const slug = slugTransform(value.title)

        console.log("🔄 GENERATED SLUG:", slug)

        setValue(
          'slug',
          slug,
          {
            shouldValidate: true
          }
        )
      }
    })


    return () => {

      console.log("🔌 UNSUBSCRIBING WATCH")

      subscription.unsubscribe()
    }

  }, [watch, slugTransform, setValue])


  // =========================
  // JSX
  // =========================

  return (

    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap"
    >

      {/* LEFT SIDE */}

      <div className="w-2/3 px-2">

        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true
          })}
        />


        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {
            required: true
          })}
          onInput={(e) => {

            setValue(
              "slug",
              slugTransform(
                e.currentTarget.value
              ),
              {
                shouldValidate: true
              }
            )
          }}
        />


        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />

      </div>


      {/* RIGHT SIDE */}

      <div className="w-1/3 px-2">

        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: !post
          })}
        />


        {/* SHOW EXISTING IMAGE */}

        {post && (post.featuredImage || post.image) && (

          <div className="w-full mb-4">

            <img
              src={service.getFilePreview(post.featuredImage || post.image)}
              alt={post.title}
              className="rounded-lg"
            />

          </div>
        )}


        <Select
          options={[
            "active",
            "inactive"
          ]}
          label="Status"
          className="mb-4"
          {...register("status", {
            required: true
          })}
        />


        <Button
          type="submit"
          bgColor={
            post
              ? "bg-green-500"
              : undefined
          }
          className="w-full"
        >

          {post
            ? "Update"
            : "Submit"}

        </Button>

      </div>

    </form>
  )
}

export default PostForm