defmodule PhoenixBase.Repo do
  use Ecto.Repo,
    otp_app: :phoenix_base,
    adapter: Ecto.Adapters.Postgres
end
