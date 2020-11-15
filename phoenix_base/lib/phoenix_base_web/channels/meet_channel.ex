defmodule PhoenixBaseWeb.MeetChannel do
  use PhoenixBaseWeb, :channel
  require Logger

  alias PhoenixBaseWeb.Presence

  @impl true
  def join("meet:lobby", _payload, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  @impl true
  def handle_info(:after_join, socket) do
    user_id = socket.assigns.user_id

    # PRESENCE
    data = %{
          online_at: inspect(System.system_time(:second)),
          status: "idle"
        }

    Presence.track(socket, user_id, data)
    pList = Presence.list(socket)
    push(socket, "presence_state", pList)
    {:noreply, socket}
  end

  @impl true
  def handle_info(:try_matchmaking, socket) do
    user_id = socket.assigns.user_id

    pList = Presence.list(socket)
    Logger.info("PLIST #{inspect(pList)}")
    {:noreply, socket}
  end


  @impl true
  def handle_in("update_self", body, socket) do
    now = inspect(System.system_time(:second))

    {:ok, _} =
      Presence.update(
        socket,
        socket.assigns.user_id,
        &(Map.merge(&1, body) |> Map.put(:online_at, now))
      )
    
    if Map.get(body, "status") === "searching" do
      send(self(), :try_matchmaking)
    end

    {:reply, :ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (meet:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end
end
