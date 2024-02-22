// import React, {useState, useEffect} from 'react'
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from 'recharts' // Combined import statement

// import Loader from '../Loader'

// const Analysis = ({username}) => {
//   const [analysisDetails, setAnalysisDetails] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const apiKey = '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'
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://api.github.com/users/${username}/repos?per_page=100&access_token=${apiKey}`,
//         )
//         const data = await response.json()
//         const analysisData = {
//           quarterCommitCount: [],
//           langRepoCount: {},
//           langCommitCount: {},
//           repoCommitCount: [],
//         }

//         const currentDate = new Date()
//         const currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3)

//         const fetchCommitData = repo => {
//           const repoCreatedAt = new Date(repo.created_at)
//           const repoQuarter = Math.floor((repoCreatedAt.getMonth() + 3) / 3)
//           const quarterName = `Q${repoQuarter}`

//           if (
//             !analysisData.quarterCommitCount.some(q => q.name === quarterName)
//           ) {
//             analysisData.quarterCommitCount.push({
//               name: quarterName,
//               value: 0,
//             })
//           }

//           const langIndex = Object.prototype.hasOwnProperty.call(
//             analysisData.langRepoCount,
//             repo.language,
//           )
//             ? analysisData.langRepoCount[repo.language]
//             : 0
//           analysisData.langRepoCount[repo.language] = langIndex + 1

//           return fetch(repo.commits_url)
//             .then(commitResponse => commitResponse.json())
//             .then(commits => {
//               commits.forEach(commit => {
//                 const commitDate = new Date(commit.commit.author.date)
//                 const commitQuarter = Math.floor(
//                   (commitDate.getMonth() + 3) / 3,
//                 )

//                 if (repoQuarter === commitQuarter) {
//                   analysisData.quarterCommitCount[repoQuarter - 1].value += 1
//                 }
//               })

//               if (
//                 !Object.prototype.hasOwnProperty.call(
//                   analysisData.langCommitCount,
//                   repo.language,
//                 )
//               ) {
//                 analysisData.langCommitCount[repo.language] = 0
//               }

//               analysisData.langCommitCount[repo.language] += commits.length
//               analysisData.repoCommitCount.push(commits.length)
//             })
//         }

//         await Promise.all(data.map(fetchCommitData))

//         setAnalysisDetails(analysisData)
//         setLoading(false)
//       } catch (e) {
//         setError(error.message)
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [username])

//   const handleRetry = () => {
//     setError(null)
//     setLoading(true)
//   }

//   if (loading) {
//     return <Loader />
//   }

//   if (error) {
//     return (
//       <div>
//         Failed to fetch analysis details.{' '}
//         <button onClick={handleRetry}>Retry</button>
//       </div>
//     )
//   }

//   if (!analysisDetails) {
//     return <div>No analysis details found.</div>
//   }
//   const {quarterCommitCount, langRepoCount, langCommitCount, repoCommitCount} =
//     analysisDetails
//   return (
//     <div className="analysis-container">
//       <h1>Analysis</h1>
//       <div className="analysis-content">
//         <div className="chart-container">
//           <BarChart
//             width={500}
//             height={300}
//             data={quarterCommitCount}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="value" fill="#8884d8" />
//           </BarChart>
//         </div>
//         <div className="chart-container">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={Object.entries(langRepoCount).map(([key, value]) => ({
//                   name: key,
//                   value,
//                 }))}
//                 dataKey="value"
//                 innerRadius={60}
//                 outerRadius={80}
//                 fill="#8884d8"
//               >
//                 {Object.entries(langCommitCount).map(([key, value]) => (
//                   <Cell
//                     key={key}
//                     fill={`#${Math.floor(Math.random() * 16777215).toString(
//                       16,
//                     )}`}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Analysis
