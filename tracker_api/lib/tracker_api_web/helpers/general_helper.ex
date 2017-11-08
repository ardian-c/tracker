defmodule TrackerApiWeb.GeneralHelper do
  def objectid(id) do
    {_, idbin} = Base.decode16(id, case: :mixed)
    %BSON.ObjectId{value: idbin}
  end
end