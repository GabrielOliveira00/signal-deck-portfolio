export default function Loading() {
  return (
    <main className="shell pb-10 pt-6">
      <div className="grid gap-6">
        <div className="window-panel p-6">
          <div className="h-5 w-52 rounded-full bg-white/[0.08]" />
          <div className="mt-6 h-16 max-w-3xl rounded-[28px] bg-white/[0.08]" />
          <div className="mt-4 h-8 max-w-2xl rounded-[22px] bg-white/[0.08]" />
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="window-panel p-5">
              <div className="h-4 w-24 rounded-full bg-white/[0.08]" />
              <div className="mt-4 h-10 w-32 rounded-[18px] bg-white/[0.08]" />
              <div className="mt-6 h-2 rounded-full bg-white/[0.06]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
