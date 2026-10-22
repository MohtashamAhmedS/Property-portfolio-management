const TASK_TYPES = {
  rent: { title: 'Rent Pending', color: '#B8A04A' },
  bill: { title: 'Bill Pending', color: '#8E4DBD' },
}

const ROW_SHADOW =
  '-2px -2px 4px 0px rgba(0, 0, 0, 0.25), 2px 2px 4px 0px rgba(0, 0, 0, 0.25)'

export default function TasksSection({ tasks }) {
  return (
    <section className="px-8 pb-8">
      <h2 className="text-xl font-medium text-black mb-3">Tasks</h2>

      <ul className="flex flex-col gap-3">
        {tasks.map((task) => {
          const { title, color } = TASK_TYPES[task.type]
          return (
            <li
              key={task.id}
              className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3"
              style={{ boxShadow: ROW_SHADOW }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <p className="text-sm truncate">
                  <span className="text-black">{title} - </span>
                  <span className="text-gray-400">{task.address}</span>
                </p>
              </div>

              <span className="text-sm text-gray-400 shrink-0">
                {task.dueDate}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
