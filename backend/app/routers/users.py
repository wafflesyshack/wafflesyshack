#reutersの中にあるファイルはそれぞれの機能ごとに、エンドポイントの実装をするためのファイル。下のコードは例。

#@router.post("/items", response_model=AddItemResponse)
#async def add_item(name: str = Form(...), category: str = Form(...), 
#                   image: UploadFile = File(...), db: sqlite3.Connection = Depends(get_db)):
#    
#    if not name:
#        raise HTTPException(status_code=400, detail="name is required")
#
#    image_name = await hash_and_rename_image(image)
#    add_item_to_db(db, name, category, image_name)
#
#    return {"message": f"Item added: {name}, {category}, {image_name}"}




#下はあおか用のメモ

#目標一覧の取得

#カレンダー情報の取得

#星空情報の取得

#目標詳細画面への遷移